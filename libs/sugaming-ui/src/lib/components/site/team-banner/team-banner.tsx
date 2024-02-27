import React from 'react';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { Logo } from '../logo/logo';
import { TeamMemberAvatar } from '../team-member-avatar/team-member-avatar';

interface TeamBannerProps {
  team: ApiClient.Cs2TeamResponseBodyDto;
}

export function TeamBanner({ team }: TeamBannerProps) {
  return (
    <>
      <div className="absolute inset-0 flex flex-col w-full h-full pt-5 bg-blue-900 overflow-ellipsis items-center text-center text-white">
        <span className="w-fit px-2 py-1 text-3xl font-bold bg-white text-black dark:bg-black dark:text-white">
          {team.name.toUpperCase()}
        </span>
        <Logo className="px-4 py-2 scale-50 -mt-3 bg-white text-black dark:bg-black dark:text-white" />
      </div>
      <div
        className="absolute inset-0 w-full h-full grid justify-center items-end"
        style={{
          padding: `0px ${5 + (libConfig.cs2Team.members.max - team.members.length) * 10}%`,
          gridTemplateColumns: `repeat(${team.members.length}, 1fr)`,
        }}
      >
        {team.members.map((member) => (
          <TeamMemberAvatar member={member} key={member.id} />
        ))}
      </div>
    </>
  );
}
