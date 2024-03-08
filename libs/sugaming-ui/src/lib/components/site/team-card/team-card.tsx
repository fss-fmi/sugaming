import { ApiClient } from '@sugaming/sugaming-api-client/client';
import React from 'react';
import { SiCounterstrike } from 'react-icons/si';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { TeamBanner } from '../team-banner/team-banner';
import { Card, CardContent, CardHeader } from '../../common/server';

export function TeamCard({ team }: { team: ApiClient.Cs2TeamResponseBodyDto }) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/cs2/teams/${team.id}`}>
      <Card className="w-full transition hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="relative p-0 w-full aspect-[21/9] space-y-0 overflow-hidden rounded-t-xl">
          <TeamBanner team={team} />
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex items-center">
            <SiCounterstrike className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-bold text-ellipsis overflow-hidden">
              {team.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
