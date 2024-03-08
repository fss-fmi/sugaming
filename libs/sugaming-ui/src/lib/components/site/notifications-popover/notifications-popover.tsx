'use client';

import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { FaBell, FaCheck, FaEnvelope, FaX } from 'react-icons/fa6';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { Button, Card } from '../../common/server';
import { Popover, PopoverContent, PopoverTrigger } from '../../common/client';

interface NotificationsPopoverProps {
  user: ApiClient.UserResponseBodyDto;
}
export function NotificationsPopover({ user }: NotificationsPopoverProps) {
  const t = useTranslations('site.notifications-popover');
  const locale = useLocale();
  const [invites, setInvites] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  // Refresh invites and join requests every 5000 ms
  async function updateNotifications() {
    try {
      const currentInvites =
        await ApiClient.UsersApiService.usersControllerGetUserCs2TeamInvitesV1({
          authorization: await getBearerToken(),
          acceptLanguage: locale,
        });
      setInvites(currentInvites);
    } catch {
      setInvites([]);
    }

    try {
      const currentJoinRequests =
        await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetJoinRequestsV1({
          authorization: await getBearerToken(),
          acceptLanguage: locale,
        });
      setJoinRequests(currentJoinRequests);
    } catch {
      setJoinRequests([]);
    }
  }

  useEffect(() => {
    updateNotifications();
    const interval = setInterval(async () => {
      updateNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
              <Card
                key={invite.id}
                className="flex flex-row items-center gap-x-1 p-2"
              >
                <div>
                  <FaEnvelope className="w-6 h-6 m-2" />
                </div>
                <p>
                  {t('you-have-been-invited', { teamName: invite.team.name })}
                </p>
                <div className="flex flex-row gap-x-1 ml-auto">
                  <Button variant="ghost">
                    <FaX className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost">
                    <FaCheck className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
