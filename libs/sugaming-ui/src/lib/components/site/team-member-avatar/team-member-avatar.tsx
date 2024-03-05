'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../common/client';

interface TeamMemberAvatarProps {
  member: ApiClient.UserResponseBodyDto;
}

export function TeamMemberAvatar({ member }: TeamMemberAvatarProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <img
          className="scale-150 mb-2 transition hover:z-10 hover:scale-[175%] cursor-default"
          src={member.avatarUrl}
          alt={`${member.firstName} ${member.lastName}`}
        />
      </HoverCardTrigger>

      <HoverCardContent
        className="w-fit min-w-64 max-w-96 z-40 cursor-default"
        side="top"
      >
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              src={member.avatarUrl}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <AvatarFallback>
              {member.firstName[0]}
              {member.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">{member.nickname}</h4>
            <p className="text-sm">
              {member.firstName} {member.lastName}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
