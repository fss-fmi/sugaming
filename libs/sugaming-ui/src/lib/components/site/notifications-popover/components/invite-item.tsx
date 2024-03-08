import { FaCheck, FaEnvelope, FaX } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { respondToTeamInvite } from '@sugaming/sugaming-api-client/next';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { Button, Card } from '../../../common/server';
import { toast } from '../../../common/client';
import response = ApiClient.UsersPostCurrentCs2TeamInvitesRespondRequestBodyDto.response;

interface InviteItemProps {
  invite: { id: number; team: { name: string } };
}

export function InviteItem({ invite }: InviteItemProps) {
  const t = useTranslations('site.notifications-popover.invite-item');
  async function declineInvite() {
    const requestResponse = await respondToTeamInvite(
      `${invite.id}`,
      response.DECLINE,
    );
    if (requestResponse?.error) {
      toast({
        variant: 'destructive',
        title: requestResponse.error,
        description: t('try-again'),
      });
    } else {
      toast({
        variant: 'default',
        title: t('declined'),
      });
    }
  }

  async function acceptInvite() {
    const requestResponse = await respondToTeamInvite(
      `${invite.id}`,
      response.ACCEPT,
    );
    if (requestResponse?.error) {
      toast({
        variant: 'destructive',
        title: requestResponse.error,
        description: t('try-again'),
      });
    } else {
      toast({
        variant: 'default',
        title: t('accepted'),
      });
    }
  }

  return (
    <Card className="flex flex-row items-center gap-x-1 p-2">
      <div>
        <FaEnvelope className="w-6 h-6 m-2" />
      </div>
      <p>{t('you-have-been-invited', { teamName: invite.team.name })}</p>
      <div className="flex flex-row gap-x-1 ml-auto">
        <Button variant="ghost" onClick={() => declineInvite()}>
          <FaX className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={() => acceptInvite()}>
          <FaCheck className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
