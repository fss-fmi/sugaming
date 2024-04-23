import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/team-card/team-card';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { GoVerified } from 'react-icons/go';
import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/card/components/card';
import { CardHeader } from '@sugaming/sugaming-ui/lib/components/common/card/components/card-header';
import { Skeleton } from '@sugaming/sugaming-ui/lib/components/common/skeleton/skeleton';
import Image from 'next/image';
import { JoinGameDevEventConfirmationDialog } from '@sugaming/sugaming-ui/lib/components/site/join-game-dev-event-confirmation-dialog/join-game-dev-event-confirmation-dialog';
import { CardContent } from '@sugaming/sugaming-ui/lib/components/common/server';
import { cn } from '@sugaming/sugaming-ui/lib/utils';
import { Inter_Tight } from 'next/font/google';
import { getUser } from '@sugaming/sugaming-api-client/next';

interface GameDevEventPageProps {
  params: { name: string };
}

const titleFont = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
});

export default async function GameDevEventPage({
  params,
}: GameDevEventPageProps) {
  const t = await getTranslations('game-dev-event-page');
  const user = await getUser();
  const eventName = params.name;
  const event =
    await ApiClient.GameDevEventsApiService.gameDevEventsControllerGetGameDevEventV1(
      { eventName },
    );

  async function GameJamParticipantsCards() {
    const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1(
      {},
    );
    return teams.map((team) => <TeamCard key={team.id} team={team} />);
  }

  return (
    <Card className="flex mx-auto mt-10 h-full w-full md:w-5/6 flex-col items-center p-4 md:p-8 space-y-4">
      <CardContent className="flex flex-col gap-4 items-center">
        <Image
          src={event.coverUrl}
          alt={event.name}
          width={1920}
          height={1080}
          className="w-2/3"
        />

        <h1
          className={cn(
            titleFont.className,
            'text-xl sm:text-2xl md:text-4xl capitalize',
          )}
        >
          {event.name}
        </h1>

        {/* TODO: Refactor the above */}
        {user && user.gameDevEvents.length === 0 && (
          <JoinGameDevEventConfirmationDialog eventName={event.name} />
        )}

        {/* <div className="flex items-center"> */}
        {/*  <GoVerified className="w-8 h-8 mr-2" /> */}
        {/*  <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip"> */}
        {/*    {t('participants')} */}
        {/*  </h2> */}
        {/* </div> */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white"> */}
        {/*  <Suspense fallback={<FallbackCards />}> */}
        {/*    <GameJamParticipantsCards /> */}
        {/*  </Suspense> */}
        {/* </div> */}
      </CardContent>
    </Card>
  );
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
