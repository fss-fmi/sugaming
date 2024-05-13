'use client';

import React, { ReactNode, useState } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { useTranslations } from 'next-intl';
import { InviteConfirmationDialog } from './components/invite-confirmation-dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../common/client';

interface UsersSearchProps {
  children: ReactNode;
  teamId: number;
  usersWithoutATeam: ApiClient.UserPublicDto[];
  usersWithATeam: ApiClient.UserPublicDto[];
  usersRequestedToJoin: ApiClient.UserPublicDto[];
  usersAlreadyInvited: ApiClient.UserPublicDto[];
}

export function UsersSearch({
  children,
  teamId,
  usersWithoutATeam,
  usersWithATeam,
  usersRequestedToJoin,
  usersAlreadyInvited,
}: UsersSearchProps) {
  const t = useTranslations('site.users-search');
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<JSX.Element | undefined>();
  const [usersWithoutATeamState, setUsersWithoutATeamState] =
    useState(usersWithoutATeam);
  const [usersWithATeamState, setUsersWithATeamState] =
    useState(usersWithATeam);
  const [usersRequestedToJoinState, setUsersRequestedToJoinState] =
    useState(usersRequestedToJoin);
  const [usersAlreadyInvitedState, setUsersAlreadyInvitedState] =
    useState(usersAlreadyInvited);

  function completeSuccessfulInviteConfirmation(userId: string) {
    setUsersAlreadyInvitedState([
      [
        ...usersWithoutATeamState,
        ...usersWithATeamState,
        ...usersRequestedToJoinState,
      ].find((user) => user.id === userId),
      ...usersAlreadyInvitedState,
    ]);
    setUsersWithoutATeamState(
      usersWithoutATeamState.filter((user) => user.id !== userId),
    );
    setUsersWithATeamState(
      usersWithATeamState.filter((user) => user.id !== userId),
    );
    setUsersRequestedToJoinState(
      usersRequestedToJoinState.filter((user) => user.id !== userId),
    );
  }

  function openInviteConfirmation(user: ApiClient.UserPublicDto) {
    // Close command dialog
    setIsOpen(false);

    // Open invite confirmation dialog
    const currentDialog = (
      <InviteConfirmationDialog
        key={user.id}
        user={user}
        teamId={teamId}
        completeSuccessfulInviteConfirmation={() =>
          completeSuccessfulInviteConfirmation(user.id)
        }
      />
    );
    // TODO: remove dialog after closing
    setDialog(currentDialog);
  }

  function commandItemProfile(user: ApiClient.UserPublicDto) {
    return (
      <>
        <div className="mr-2">
          <Avatar>
            <AvatarImage
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="font-semibold">{user.nickname}</p>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <CommandDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={t('search-placeholder')} />
        <CommandList>
          <CommandEmpty>{t('no-results')}</CommandEmpty>
          {usersRequestedToJoinState.length > 0 && (
            <CommandGroup heading={t('users-requested-to-join')}>
              {usersRequestedToJoinState.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersWithoutATeamState.length > 0 && (
            <CommandGroup heading={t('users-without-a-team')}>
              {usersWithoutATeamState.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersWithATeamState.length > 0 && (
            <CommandGroup heading={t('users-with-a-team')}>
              {usersWithATeamState.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersAlreadyInvitedState.length > 0 && (
            <CommandGroup heading={t('users-already-invited')}>
              {usersAlreadyInvitedState.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user)}
                  disabled
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      {dialog}
    </>
  );
}
