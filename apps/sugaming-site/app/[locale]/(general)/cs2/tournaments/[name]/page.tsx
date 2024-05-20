import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { getTranslations } from 'next-intl/server';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/card/components/card';
import React from 'react';
import { TournamentBracket } from '@sugaming/sugaming-ui/lib/components/site/tournament-bracket/tournament-bracket';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@sugaming/sugaming-ui/lib/components/common/tabs/tabs';
import { AccordionItem } from '@sugaming/sugaming-ui/lib/components/common/accordion/component/accordion-item';
import { AccordionTrigger } from '@sugaming/sugaming-ui/lib/components/common/accordion/component/accordion-trigger';
import { AccordionContent } from '@sugaming/sugaming-ui/lib/components/common/accordion/component/accordion-content';
import { Accordion } from '@sugaming/sugaming-ui/lib/components/common/accordion/component/accordion';
import { Alert } from '@sugaming/sugaming-ui/lib/components/common/alert/alert';
import { LoginButtons } from '@sugaming/sugaming-ui/lib/components/site/login-buttons/login-buttons';
import { SiCounterstrike } from 'react-icons/si';
import { notFound } from 'next/navigation';

interface Cs2TournamentPageProps {
  params: { name: string };
}

export async function generateMetadata({ params }: Cs2TournamentPageProps) {
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

export default async function Cs2TournamentPage({
  params,
}: Cs2TournamentPageProps) {
  const t = await getTranslations('cs2-tournament-page');
  const user = await getUser();
  const tournamentName = params.name;
  const tournament =
    await ApiClient.Cs2TournamentsApiService.cs2TournamentsControllerGetCs2TournamentV1(
      { tournamentName },
    );

  if (!tournament) {
    notFound();
  }

  const tournamentStartDate = new Date(tournament.startDate);
  const tournamentEndDate = new Date(tournament.endDate);

  return (
    <Card className="mx-auto mt-10 flex w-full flex-col items-stretch overflow-hidden">
      <img
        src={tournament.coverUrl}
        alt={tournament.name}
        width={1920}
        height={640}
        className="aspect-[21/5] w-full object-cover"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-none">
          <TabsTrigger value="overview">{t('overview')} </TabsTrigger>
          <TabsTrigger value="matches">{t('matches')}</TabsTrigger>
        </TabsList>

        <div className="p-2 md:p-4">
          <TabsContent value="overview" className="flex flex-col gap-y-4">
            <Alert className="md:flex space-x-2">
              <SiCounterstrike className="h-6 w-6" />

              <div className="flex flex-row gap-4">
                <div>
                  <p className="uppercase">{t('dates')}</p>
                  <p className="font-bold">
                    {tournamentStartDate.toLocaleDateString('bg-BG', {
                      day: 'numeric',
                      month: 'numeric',
                    })}{' '}
                    -{' '}
                    {tournamentEndDate.toLocaleDateString('bg-BG', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="uppercase">{t('teams')}</p>
                  <p className="font-bold">{tournament.maxTeams}</p>
                </div>

                <div>
                  <p className="uppercase">{t('location')}</p>
                  <p className="font-bold">{tournament.location}</p>
                </div>
              </div>

              <LoginButtons className="md:ml-auto mt-2 md:mt-0" />
            </Alert>

            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">
                  {t('bracket')}
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <TournamentBracket tournament={null} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">
                  {t('participants')}
                </AccordionTrigger>
                <AccordionContent className="p-4">Gosho</AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="matches" className="flex flex-col gap-y-4">
            Matches
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
