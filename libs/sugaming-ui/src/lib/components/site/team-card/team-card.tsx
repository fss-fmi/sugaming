import { ApiClient } from '@sugaming/sugaming-api-client/client';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import React from 'react';
import { SiCounterstrike } from 'react-icons/si';
import { Logo } from '../logo/logo';
import { TeamMemberAvatar } from '../team-member-avatar/team-member-avatar';
import { Card, CardContent, CardHeader } from '../../common/server';

export function TeamCard({ team }: { team: ApiClient.Cs2TeamResponseBodyDto }) {
  return (
    <Card className="w-full transition hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <CardHeader className="relative p-0 w-full aspect-[21/9] space-y-0 overflow-hidden rounded-t-md">
        <div className="absolute inset-0 flex flex-col w-full h-full pt-6 bg-blue-900 overflow-ellipsis text-center text-white">
          <p className="text-3xl font-bold">{team.name.toUpperCase()}</p>
          <Logo className="mx-auto scale-50 -mt-1" />
        </div>
        <div
          className="absolute inset-0 w-full h-full grid justify-center items-end"
          style={{
            padding: `0px ${(libConfig.cs2Team.members.max - team.members.length) * 10}%`,
            gridTemplateColumns: `repeat(${team.members.length}, 1fr)`,
          }}
        >
          {team.members.map((member) => (
            <TeamMemberAvatar member={member} key={member.id} />
          ))}
        </div>
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
  );
}
