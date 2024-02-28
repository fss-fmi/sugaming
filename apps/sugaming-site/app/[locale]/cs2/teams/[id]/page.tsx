import { getTranslations } from 'next-intl/server';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { TeamBanner } from '@sugaming/sugaming-ui/lib/components/site/team-banner/team-banner';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { PlayerSearch } from '@sugaming/sugaming-ui/lib/components/site/client';
import React, { Suspense } from 'react';
import { SiCounterstrike } from 'react-icons/si';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';

export default async function CS2TeamPage() {
  const t = await getTranslations('cs2-team-page');
  const locale = useLocale();
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  const team = teams[0]; // TODO: Refactor to get team by id

  // TODO: this is requested for each subcategory, refactor to get all users once
  async function getUsersOutsideOfThisTeam() {
    const users = await ApiClient.UsersApiService.usersControllerGetAllV1({});
    return users.filter((user) => user.cs2Team?.id !== team.id);
  }

  async function getTeamInvitesSentUserIds() {
    const invites =
      await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetInvitationsSentV1(
        {
          authorization: await getBearerToken(),
        },
      );
    return invites.map((invite) => invite.userId);
  }

  async function getTeamJoinRequestsUserIds() {
    const requests =
      await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetJoinRequestsV1({
        authorization: await getBearerToken(),
      });
    return requests.map((request) => request.userId);
  }

  async function getUsersWithoutATeamAndNoRequestAndInvites() {
    const users = await getUsersOutsideOfThisTeam();
    const invitesUserIds = await getTeamInvitesSentUserIds();
    const requestsUserIds = await getTeamJoinRequestsUserIds();

    return users
      .filter((user) => !user.cs2Team)
      .filter((user) => !invitesUserIds.includes(user.id))
      .filter((user) => !requestsUserIds.includes(user.id));
  }

  async function getUsersWithATeamAndNoRequestAndInvites() {
    const users = await ApiClient.UsersApiService.usersControllerGetAllV1({});
    const invitesUserIds = await getTeamInvitesSentUserIds();
    const requestsUserIds = await getTeamJoinRequestsUserIds();

    return users
      .filter((user) => user.cs2Team)
      .filter((user) => !invitesUserIds.includes(user.id))
      .filter((user) => !requestsUserIds.includes(user.id));
  }

  async function getUsersRequestedToJoin() {
    const users = await getUsersOutsideOfThisTeam();
    const requestsUserIds = await getTeamJoinRequestsUserIds();

    return users.filter((user) => requestsUserIds.includes(user.id));
  }

  async function getUsersAlreadyInvited() {
    const users = await getUsersOutsideOfThisTeam();
    const invitesUserIds = await getTeamInvitesSentUserIds();

    return users.filter((user) => invitesUserIds.includes(user.id));
  }

  return (
    <Card className="w-full mt-12">
      <CardHeader className="relative p-0 w-full aspect-[12/3] space-y-0 overflow-hidden rounded-t-xl">
        <TeamBanner team={team} />
        <Button
          variant="outline"
          className="absolute top-1 left-1 rounded-xl"
          asChild
        >
          <Link href={`/${locale}/cs2/teams`}>
            <FaArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Suspense fallback={null}>
          <PlayerSearch
            teamId={team.id}
            usersWithoutATeam={await getUsersWithoutATeamAndNoRequestAndInvites()}
            usersWithATeam={await getUsersWithATeamAndNoRequestAndInvites()}
            usersRequestedToJoin={await getUsersRequestedToJoin()}
            usersAlreadyInvited={await getUsersAlreadyInvited()}
          >
            <Button className="absolute bottom-1 right-1 rounded-xl">
              <FaUserPlus className="h-4 w-4" />
            </Button>
          </PlayerSearch>
        </Suspense>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center">
          <SiCounterstrike className="h-8 w-8 mr-1" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase my-2 truncate text-clip">
            {team.name}
          </h1>
        </div>
      </CardContent>
    </Card>
  );
}
