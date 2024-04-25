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
import { cn } from '@sugaming/sugaming-ui/lib/utils';
import { Inter_Tight } from 'next/font/google';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/logo/logo';
import { ScrollArea } from '@sugaming/sugaming-ui/lib/components/common/scroll-area/components/scroll-area';
import { UserCard } from '@sugaming/sugaming-ui/lib/components/site/user-card/user-card';
import { CardContent } from '@sugaming/sugaming-ui/lib/components/common/card/components/card-content';

interface GameDevEventPageProps {
  params: { name: string };
}

export async function generateMetadata({ params }: GameDevEventPageProps) {
  const eventName = params.name;
  const event =
    await ApiClient.GameDevEventsApiService.gameDevEventsControllerGetGameDevEventV1(
      { eventName },
    );
  return {
    title: event.name,
    description: event.description,
    openGraph: {
      images: [event.coverUrl],
    },
  };
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

  return (
    <Card className="mx-auto mt-10 grid lg:grid-cols-2 w-full flex-col items-stretch overflow-hidden">
      <div className="relative p-0 flex w-full h-full flex-col text-white bg-[#27183d] aspect-square">
        <Image
          src={event.coverUrl}
          alt={event.name}
          width={1920}
          height={1920}
          className="absolute"
        />

        <div className="absolute z-20 flex items-center text-lg font-medium top-5 left-5">
          <Logo />
        </div>

        <div className="absolute z-20 mt-auto bottom-5 right-5">
          <blockquote>
            <p className="text-sm">{event.description}</p>
            <p className="text-sm">📍 {event.location}</p>
          </blockquote>
        </div>
      </div>

      <div className="p-8 aspect-square grid grid-rows-[1fr_1fr_8fr_1fr] h-full">
        <h1
          className={cn(
            titleFont.className,
            'text-xl sm:text-2xl md:text-4xl uppercase',
          )}
        >
          {event.name}
        </h1>

        <div className="flex items-center">
          <GoVerified className="w-6 h-6 mr-2" />
          <h2 className="text-md sm:text-xl md:text-2xl font-semibold my-4 truncate text-clip">
            {t('participants')} ({event.participants.length}/
            {event.maxParticipants})
          </h2>
        </div>

        <ScrollArea className="pr-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-evenly">
            {event.participants.map((participant) => (
              <Card className="p-1">
                <UserCard key={participant.id} member={participant} />
              </Card>
            ))}
          </div>
        </ScrollArea>

        {(!user || (user && user.gameDevEvents.length === 0)) && (
          <JoinGameDevEventConfirmationDialog eventName={event.name} />
        )}
      </div>
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
