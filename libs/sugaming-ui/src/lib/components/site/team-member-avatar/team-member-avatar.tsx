'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import React, { useEffect, useState } from 'react';
import { FaUserSlash } from 'react-icons/fa6';
import { getUser } from '@sugaming/sugaming-api-client/next';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../common/client';
import { Button } from '../../common/server';

interface TeamMemberAvatarProps {
  member: ApiClient.UserResponseBodyDto;
  // eslint-disable-next-line react/require-default-props
  enableTeamCapitanControls?: boolean;
}

export function TeamMemberAvatar({
  member,
  enableTeamCapitanControls,
}: TeamMemberAvatarProps) {
  const [user, setUser] = useState<ApiClient.UserResponseBodyDto | undefined>();
  useEffect(() => {
    getUser()
      .then((response) => setUser(response))
      .catch(() => setUser(undefined));
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group relative">
          <img
            className="scale-150 mb-2 transition group-hover:z-10 group-hover:scale-[175%] cursor-default"
            src={member.avatarUrl}
            alt={`${member.firstName} ${member.lastName}`}
          />

          {enableTeamCapitanControls && user && member.id !== user?.id && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <Button variant="secondary">
                  <FaUserSlash />
                </Button>
                {/* <Button variant="secondary"> */}
                {/*  <FaCrown /> */}
                {/* </Button> */}
              </div>
            </div>
          )}
        </div>
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
