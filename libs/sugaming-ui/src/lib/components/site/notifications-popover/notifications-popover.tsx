'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { FaBell } from 'react-icons/fa6';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { InviteItem } from './components/invite-item';
import { Button, Card } from '../../common/server';
import { Popover, PopoverContent, PopoverTrigger } from '../../common/client';

interface NotificationsPopoverProps {
  user: ApiClient.UserDto;
}
export function NotificationsPopover({ user }: NotificationsPopoverProps) {
  const t = useTranslations('site.notifications-popover');
  const locale = useLocale();
  const [invites, setInvites] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    // Refresh invites and join requests every 5000 ms
    async function updateNotifications() {
      if (!user) return;

      try {
        const currentInvites =
          await ApiClient.UsersApiService.usersControllerGetUserCs2TeamInvitesV1(
            {
              authorization: await getBearerToken(),
              acceptLanguage: locale,
            },
          );
        setInvites(currentInvites);
      } catch {
        setInvites([]);
      }

      try {
        if (user.cs2Team?.capitanId !== user.id) return;
        const currentJoinRequests =
          await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetJoinRequestsV1(
            {
              teamId: user.cs2Team.id,
              authorization: await getBearerToken(),
              acceptLanguage: locale,
            },
          );
        setJoinRequests(currentJoinRequests);
      } catch {
        setJoinRequests([]);
      }
    }

    updateNotifications().then();
    const interval = setInterval(async () => {
      await updateNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, [locale, user]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <div className="relative">
            <FaBell />
            {/* dot if request or invites are more than 0 */}
            {(joinRequests.length > 0 || invites.length > 0) && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100vw] md:w-[500px] p-4 gap-1">
        {joinRequests.length === 0 && invites.length === 0 && (
          <p className="font-bold text-center">{t('no-notifications')}</p>
        )}

        {joinRequests.length > 0 && (
          <div>
            <h2 className="font-bold text-center">{t('join-joinRequests')}</h2>
            {joinRequests.map((request) => (
              <Card key={request.id}>{request.team.name}</Card>
            ))}
          </div>
        )}

        {invites.length > 0 && (
          <div>
            <h2 className="font-bold">{t('invites')}</h2>
            {invites.map((invite) => (
              <InviteItem key={invite.id} invite={invite} />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
