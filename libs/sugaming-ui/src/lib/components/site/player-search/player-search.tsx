'use client';

import React, { ReactNode, useState } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { InviteConfirmationDialog } from './components/invite-confirmation-dialog';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../common/client';

interface PlayerSearchProps {
  children: ReactNode;
  teamId: string;
  users: ApiClient.UserResponseBodyDto[];
}

export function PlayerSearch({ children, teamId, users }: PlayerSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogs, setDialogs] = useState<JSX.Element[]>([]);

  function openInviteConfirmation(userId: string) {
    // Close command dialog
    setIsOpen(false);

    // Open invite confirmation dialog
    const dialog = (
      <InviteConfirmationDialog key={userId} userId={userId} teamId={teamId} />
    );
    // TODO: remove dialog after closing
    setDialogs([...dialogs, dialog]);
  }

  return (
    <>
      <CommandDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a name to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Users">
            {users.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => openInviteConfirmation(user.id)}
              >
                <div>
                  <p className="font-semibold">{user.nickname}</p>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {dialogs}
    </>
  );
}
