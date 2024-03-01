import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/server';
import { isCs2TeamVerified } from '@sugaming/sugaming-services/config/utils.config';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import {
  Card,
  CardHeader,
  Skeleton,
} from '@sugaming/sugaming-ui/lib/components/common/server';

async function VerifiedTeamsCards() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return teams
    .filter((team) => isCs2TeamVerified(team))
    .map((team) => <TeamCard key={team.id} team={team} />);
}

async function UnverifiedTeamsCards() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return teams
    .filter((team) => !isCs2TeamVerified(team))
    .map((team) => <TeamCard key={team.id} team={team} />);
}

function FallbackCards() {
  return Array(4)
    .fill(0)
    .map((_) => (
      <Card
        key={Math.random()}
        className="w-full transition hover:-translate-y-1 hover:shadow-lg "
      >
        <CardHeader className="relative p-0 w-full aspect-[21/9] space-y-0 overflow-hidden rounded-t-xl">
          <Skeleton className="w-full h-full" />
        </CardHeader>
        <div className="p-3">
          <Skeleton className="w-1/2 h-6" />
        </div>
      </Card>
    ));
}

export default async function CS2TeamsPage() {
  const t = await getTranslations('cs2-teams-page');
  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase my-4 truncate text-clip">
        {t('title')}
      </h1>

      <div className="flex items-center">
        <GoVerified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('verified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        <Suspense fallback={<FallbackCards />}>
          <VerifiedTeamsCards />
        </Suspense>
      </div>

      <div className="flex items-center">
        <GoUnverified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('unverified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        <Suspense fallback={<FallbackCards />}>
          <UnverifiedTeamsCards />
        </Suspense>
      </div>
    </>
  );
}
