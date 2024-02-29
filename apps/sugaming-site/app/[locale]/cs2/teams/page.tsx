import { ApiClient } from '@sugaming/sugaming-api-client/client';
import {
  LoginButtons,
  TeamCard,
} from '@sugaming/sugaming-ui/lib/components/site/server';
import { isCs2TeamVerified } from '@sugaming/sugaming-services/config/utils.config';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { getTranslations } from 'next-intl/server';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/card/components/card';
import { Button } from '@sugaming/sugaming-ui/lib/components/common/button/button';

export default async function CS2TeamsPage() {
  const t = await getTranslations('cs2-teams-page');
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  const user = await getUser();
  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase my-4 truncate text-clip">
        {t('title')}
      </h1>

      {!user && (
        <Card className="flex flex-col md:flex-row items-center p-4">
          <div className="md:mr-auto">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              {t('want-to-be-a-part-of-a-team')}
            </h1>
            <span>{t('create-an-account-or-login')}</span>
          </div>
          <LoginButtons className="md:ml-auto mt-2 md:mt-0" />
        </Card>
      )}

      {user && (
        <Card className="flex flex-col md:flex-row items-center p-4">
          <div className="md:mr-auto">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              {t('want-to-be-a-part-of-a-team')}
            </h1>
            <span>{t('create-a-team-or-join-an-existing-one')}</span>
          </div>
          <div className="md:ml-auto mt-2 md:mt-0">
            <Button>{t('create-a-team')}</Button>
          </div>
        </Card>
      )}

      <div className="flex items-center">
        <GoVerified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('verified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
      </div>

      <div className="flex items-center">
        <GoUnverified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('unverified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        {teams
          .filter((team) => !isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
      </div>
    </>
  );
}
