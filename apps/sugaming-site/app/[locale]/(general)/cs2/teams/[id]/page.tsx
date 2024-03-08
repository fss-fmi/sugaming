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
import { UsersSearch } from '@sugaming/sugaming-ui/lib/components/site/client';
import React, { Suspense } from 'react';
import { SiCounterstrike } from 'react-icons/si';
import { getBearerToken, getUser } from '@sugaming/sugaming-api-client/next';
import { useLocale } from 'next-intl';
import { FaSignOutAlt } from 'react-icons/fa';
import { LeaveTeamDialog } from '@sugaming/sugaming-ui/lib/components/site/leave-team-dialog/leave-team-dialog';

interface CS2TeamPageProps {
  params: { id: string };
}

export default async function CS2TeamPage({ params }: CS2TeamPageProps) {
  const locale = useLocale();
  const user = await getUser();

  const team = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetTeamV1({
    teamId: params.id,
  });

  if (!team) {
    return null;
  }

  // TODO: this is requested for each subcategory, refactor to get all users once
  async function getUsersOutsideOfThisTeam() {
    const users = await ApiClient.UsersApiService.usersControllerGetAllV1({});
    return users.filter((currentUser) => currentUser.cs2Team?.id !== team.id);
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
      .filter((currentUser) => !currentUser.cs2Team)
      .filter((currentUser) => !invitesUserIds.includes(currentUser.id))
      .filter((currentUser) => !requestsUserIds.includes(currentUser.id));
  }

  async function getUsersWithATeamAndNoRequestAndInvites() {
    const users = await ApiClient.UsersApiService.usersControllerGetAllV1({});
    const invitesUserIds = await getTeamInvitesSentUserIds();
    const requestsUserIds = await getTeamJoinRequestsUserIds();

    return users
      .filter((currentUser) => currentUser.cs2Team)
      .filter((currentUser) => !invitesUserIds.includes(currentUser.id))
      .filter((currentUser) => !requestsUserIds.includes(currentUser.id));
  }

  async function getUsersRequestedToJoin() {
    const users = await getUsersOutsideOfThisTeam();
    const requestsUserIds = await getTeamJoinRequestsUserIds();

    return users.filter((currentUser) =>
      requestsUserIds.includes(currentUser.id),
    );
  }

  async function getUsersAlreadyInvited() {
    const users = await getUsersOutsideOfThisTeam();
    const invitesUserIds = await getTeamInvitesSentUserIds();

    return users.filter((currentUser) =>
      invitesUserIds.includes(currentUser.id),
    );
  }

  return (
    <Card className="w-full mt-12">
      <CardHeader className="relative p-0 w-full aspect-[12/3] space-y-0 overflow-hidden rounded-t-xl">
        <TeamBanner
          team={team}
          enableTeamCapitanControls={user?.id === team.capitanId}
        />
        <Button
          variant="outline"
          className="absolute top-1 left-1 rounded-xl"
          asChild
        >
          <Link href={`/${locale}/cs2/teams`}>
            <FaArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center">
          <SiCounterstrike className="h-8 w-8 mr-1" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase my-2 truncate text-clip">
            {team.name}
          </h1>
          <div className="ml-auto flex flex-row gap-2">
            {user && user.cs2TeamId === team.id && (
              <LeaveTeamDialog team={team} user={user}>
                <Button variant="outline">
                  <FaSignOutAlt className="h-4 w-4" />
                </Button>
              </LeaveTeamDialog>
            )}

            {user && user.id === team.capitanId && (
              <Suspense fallback={null}>
                <UsersSearch
                  teamId={team.id}
                  usersWithoutATeam={await getUsersWithoutATeamAndNoRequestAndInvites()}
                  usersWithATeam={await getUsersWithATeamAndNoRequestAndInvites()}
                  usersRequestedToJoin={await getUsersRequestedToJoin()}
                  usersAlreadyInvited={await getUsersAlreadyInvited()}
                >
                  <Button>
                    <FaUserPlus className="h-4 w-4" />
                  </Button>
                </UsersSearch>
              </Suspense>
            )}
          </div>
        </div>
        <div className="h-80">
          <div className="p-4">
            <h2 className="text-md sm:text-lg md:text-xl font-semibold">
              Matches
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
