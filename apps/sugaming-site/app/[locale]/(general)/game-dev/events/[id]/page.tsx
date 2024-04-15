import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/team-card/team-card';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { GoVerified } from 'react-icons/go';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/card/components/card';
import { CardHeader } from '@sugaming/sugaming-ui/lib/components/common/card/components/card-header';
import { Skeleton } from '@sugaming/sugaming-ui/lib/components/common/skeleton/skeleton';

async function GameJamParticipantsCards() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return teams.map((team) => <TeamCard key={team.id} team={team} />);
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

export default async function GameDevPage() {
  const t = await getTranslations('game-dev-page');
  return (
    <>
      <span>gosho</span>

      <div className="flex items-center">
        <GoVerified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('participants')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        <Suspense fallback={<FallbackCards />}>
          <GameJamParticipantsCards />
        </Suspense>
      </div>
    </>
  );
}
