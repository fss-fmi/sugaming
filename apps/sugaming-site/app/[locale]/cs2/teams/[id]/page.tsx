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

export default async function CS2TeamPage() {
  const t = await getTranslations('cs2-teams-page');
  const locale = useLocale();
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  const team = teams[0]; // TODO: Refactor to get team by id

  async function getUsersOutsideOfThisTeam() {
    const users = await ApiClient.UsersApiService.usersControllerGetAllV1({});
    return users.filter((user) => user.cs2Team?.id !== team.id);
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
            users={await getUsersOutsideOfThisTeam()}
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
