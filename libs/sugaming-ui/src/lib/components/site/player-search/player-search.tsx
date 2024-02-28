'use client';

import React, { ReactNode } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../common/client';
import { InviteButton } from './components/invite-button';

interface PlayerSearchProps {
  children: ReactNode;
  teamId: string;
  users: ApiClient.UserResponseBodyDto[];
}

export function PlayerSearch({ children, teamId, users }: PlayerSearchProps) {
  return (
    <CommandDialog trigger={children}>
      <CommandInput placeholder="Type a name to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Users">
          {users.map((user) => (
            <CommandItem key={user.id}>
              <div>
                <p className="font-semibold">{user.nickname}</p>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="ml-auto">
                <InviteButton userId={user.id} teamId={teamId} />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
