'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import React, { useEffect, useState } from 'react';
import { FaUserSlash } from 'react-icons/fa6';
import {
  getUser,
  removeMemberRequest,
} from '@sugaming/sugaming-api-client/next';
import { useTranslations } from 'next-intl';
import { UserCard } from '../user-card/user-card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  toast,
} from '../../common/client';
import { Button } from '../../common/server';

interface TeamMemberAvatarProps {
  team: ApiClient.Cs2TeamDto;
  member: ApiClient.Cs2TeamMemberDto;
  // eslint-disable-next-line react/require-default-props
  enableTeamCapitanControls?: boolean;
}

export function TeamMemberAvatar({
  team,
  member,
  enableTeamCapitanControls,
}: TeamMemberAvatarProps) {
  const t = useTranslations('site.team-member-avatar');
  const [user, setUser] = useState<ApiClient.UserDto | undefined>();
  const [exists, setExists] = useState<boolean>(true);
  useEffect(() => {
    getUser()
      .then((response) => setUser(response))
      .catch(() => setUser(undefined));
  }, []);

  async function removeMember() {
    const response = await removeMemberRequest(team, member);
    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    } else {
      setExists(false);
    }
  }

  if (!exists) {
    return null;
  }

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
                <Button variant="secondary" onClick={() => removeMember()}>
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
        <UserCard member={member} />
      </HoverCardContent>
    </HoverCard>
  );
}
