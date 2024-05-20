import React from 'react';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { Logo } from '../logo/logo';
import { TeamMemberAvatar } from '../team-member-avatar/team-member-avatar';

interface TeamBannerProps {
  team: ApiClient.Cs2TeamDto;
  // eslint-disable-next-line react/require-default-props
  enableTeamCapitanControls?: boolean;
}

export function TeamBanner({
  team,
  enableTeamCapitanControls = false,
}: TeamBannerProps) {
  return (
    <>
      <div
        className="absolute inset-0 flex flex-col w-full h-full pt-5 overflow-ellipsis items-center text-center text-white"
        style={{ backgroundColor: libConfig.cs2Team.color.mapping[team.color] }}
      >
        <span className="w-fit px-2 py-1 text-3xl font-bold bg-white text-black dark:bg-black dark:text-white">
          {team.name.toUpperCase()}
        </span>
        <Logo className="px-4 py-2 scale-50 -mt-3 bg-white text-black dark:bg-black dark:text-white" />
      </div>
      <div
        className="absolute inset-0 w-full h-full grid justify-center items-end"
        style={{
          padding: `0px ${2 + (libConfig.cs2Team.members.max - team.members.length) * 9.75}%`,
          gridTemplateColumns: `repeat(${team.members.length}, 1fr)`,
        }}
      >
        {team.members.map((member: ApiClient.UserPublicDto) => (
          <TeamMemberAvatar
            key={member.id}
            team={team}
            member={member}
            enableTeamCapitanControls={enableTeamCapitanControls}
          />
        ))}
      </div>
    </>
  );
}
