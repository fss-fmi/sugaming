import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/server';
import { isCs2TeamVerified } from '@sugaming/sugaming-services/config/utils.config';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { getTranslations } from 'next-intl/server';

export default async function CS2TeamsPage() {
  const t = await getTranslations('cs2-teams-page');
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase my-4 truncate text-clip">
        {t('title')}
      </h1>

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
