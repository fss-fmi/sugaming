'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { Avatar, AvatarFallback, AvatarImage } from '../../common/client';

interface UserCardProps {
  member: ApiClient.Cs2TeamMemberDto;
}

export function UserCard({ member }: UserCardProps) {
  return (
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
  );
}
