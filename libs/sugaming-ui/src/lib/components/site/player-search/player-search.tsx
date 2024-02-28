'use client';

import React, { ReactNode, useState } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
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

interface PlayerSearchProps {
  children: ReactNode;
  teamId: string;
  usersWithoutTeam: ApiClient.UserResponseBodyDto[];
  usersWithTeam: ApiClient.UserResponseBodyDto[];
  usersRequestedToJoin: ApiClient.UserResponseBodyDto[];
  usersAlreadyInvited: ApiClient.UserResponseBodyDto[];
}

export function PlayerSearch({
  children,
  teamId,
  usersWithoutTeam,
  usersWithTeam,
  usersRequestedToJoin,
  usersAlreadyInvited,
}: PlayerSearchProps) {
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

  function commandItemProfile(user: ApiClient.UserResponseBodyDto) {
    return (
      <>
        <div className="mr-2">
          <Avatar>
            <AvatarImage src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20280%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cdesc%3E%22Avataaars%22%20by%20%22Pablo%20Stanley%22%2C%20licensed%20under%20%22Free%20for%20personal%20and%20commercial%20use%22.%20%2F%20Remix%20of%20the%20original.%20-%20Created%20with%20dicebear.com%3C%2Fdesc%3E%3Cmetadata%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%3Crdf%3ARDF%3E%3Ccc%3AWork%3E%3Cdc%3Atitle%3EAvataaars%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3E%3Ccc%3AAgent%20rdf%3Aabout%3D%22https%3A%2F%2Ftwitter.com%2Fpablostanley%22%3E%3Cdc%3Atitle%3EPablo%20Stanley%3C%2Fdc%3Atitle%3E%3C%2Fcc%3AAgent%3E%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%3Ehttps%3A%2F%2Favataaars.com%2F%3C%2Fdc%3Asource%3E%3Ccc%3Alicense%20rdf%3Aresource%3D%22https%3A%2F%2Favataaars.com%2F%22%20%2F%3E%3C%2Fcc%3AWork%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22280%22%20height%3D%22280%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Cg%20transform%3D%22translate(8)%22%3E%3Cpath%20d%3D%22M132%2036a56%2056%200%200%200-56%2056v6.17A12%2012%200%200%200%2066%20110v14a12%2012%200%200%200%2010.3%2011.88%2056.04%2056.04%200%200%200%2031.7%2044.73v18.4h-4a72%2072%200%200%200-72%2072v9h200v-9a72%2072%200%200%200-72-72h-4v-18.39a56.04%2056.04%200%200%200%2031.7-44.73A12%2012%200%200%200%20198%20124v-14a12%2012%200%200%200-10-11.83V92a56%2056%200%200%200-56-56Z%22%20fill%3D%22%23d08b5b%22%2F%3E%3Cpath%20d%3D%22M108%20180.61v8a55.79%2055.79%200%200%200%2024%205.39c8.59%200%2016.73-1.93%2024-5.39v-8a55.79%2055.79%200%200%201-24%205.39%2055.79%2055.79%200%200%201-24-5.39Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.1%22%2F%3E%3Cg%20transform%3D%22translate(0%20170)%22%3E%3Cpath%20d%3D%22M92.68%2029.94A72.02%2072.02%200%200%200%2032%20101.05V110h200v-8.95a72.02%2072.02%200%200%200-60.68-71.11%2023.87%2023.87%200%200%201-7.56%2013.6l-29.08%2026.23a4%204%200%200%201-5.36%200l-29.08-26.23a23.87%2023.87%200%200%201-7.56-13.6Z%22%20fill%3D%22%23262e33%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(78%20134)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M35.12%2015.13a19%2019%200%200%200%2037.77-.09c.08-.77-.77-2.04-1.85-2.04H37.1C36%2013%2035%2014.18%2035.12%2015.13Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.7%22%2F%3E%3Cpath%20d%3D%22M70%2013H39a5%205%200%200%200%205%205h21a5%205%200%200%200%205-5Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M66.7%2027.14A10.96%2010.96%200%200%200%2054%2025.2a10.95%2010.95%200%200%200-12.7%201.94A18.93%2018.93%200%200%200%2054%2032c4.88%200%209.33-1.84%2012.7-4.86Z%22%20fill%3D%22%23FF4F6D%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(104%20122)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208c0%204.42%205.37%208%2012%208s12-3.58%2012-8%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.16%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(76%2090)%22%3E%3Cpath%20d%3D%22M44%2022a14%2014%200%201%201-28%200%2014%2014%200%200%201%2028%200ZM96%2022a14%2014%200%201%201-28%200%2014%2014%200%200%201%2028%200Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M36%2022a6%206%200%201%201-12%200%206%206%200%200%201%2012%200ZM88%2022a6%206%200%201%201-12%200%206%206%200%200%201%2012%200Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.7%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(76%2082)%22%3E%3Cpath%20d%3D%22M26.55%206.15c-5.8.27-15.2%204.49-14.96%2010.34.01.18.3.27.43.12%202.76-2.96%2022.32-5.95%2029.2-4.36.64.14%201.12-.48.72-.93-3.43-3.85-10.2-5.43-15.4-5.18ZM86.45%206.15c5.8.27%2015.2%204.49%2014.96%2010.34-.01.18-.3.27-.43.12-2.76-2.96-22.32-5.95-29.2-4.36-.64.14-1.12-.48-.72-.93%203.43-3.85%2010.2-5.43%2015.4-5.18Z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.6%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(-1)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M90.91%2055.36h84.18c18.24-10.53%2021.67-29.2%208.76-45.43-3.21-4.04-8.76%2011.75-25.82%2012.72-17.06.98-15.42-6.3-33.57-3.58-18.15%202.73-16.15%2017.3-28%2020.8-11.84%203.5-5.55%2015.5-5.55%2015.5Z%22%20fill%3D%22%23724133%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(49%2072)%22%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(62%2042)%22%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
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
        <CommandInput placeholder="Type a name to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {usersRequestedToJoin.length > 0 && (
            <CommandGroup heading="Requested to join">
              {usersRequestedToJoin.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user.id)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersWithoutTeam.length > 0 && (
            <CommandGroup heading="Without a team">
              {usersWithoutTeam.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user.id)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersWithTeam.length > 0 && (
            <CommandGroup heading="Already in a team">
              {usersWithTeam.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user.id)}
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {usersAlreadyInvited.length > 0 && (
            <CommandGroup heading="Already invited">
              {usersAlreadyInvited.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => openInviteConfirmation(user.id)}
                  disabled
                >
                  {commandItemProfile(user)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      {dialogs}
    </>
  );
}
