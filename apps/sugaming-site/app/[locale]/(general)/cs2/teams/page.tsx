import { ApiClient } from '@sugaming/sugaming-api-client/client';
import {
  LoginButtons,
  TeamCard,
} from '@sugaming/sugaming-ui/lib/components/site/server';
import { isCs2TeamVerified } from '@sugaming/sugaming-services/config/utils.config';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { getTranslations } from 'next-intl/server';
import { getUser } from '@sugaming/sugaming-api-client/next';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardHeader,
  Skeleton,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { FaUsers, FaUserTie } from 'react-icons/fa6';
import { CreateTeamDialog } from '@sugaming/sugaming-ui/lib/components/site/client';
import { Suspense } from 'react';

export async function generateMetadata() {
  const t = await getTranslations('cs2-teams-page');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CS2TeamsPage() {
  const t = await getTranslations('cs2-teams-page');
  const user = await getUser();

  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase my-4 truncate text-clip">
        {t('title')}
      </h1>

      {!user && (
        <Alert className="md:flex">
          <FaUserTie className="h-4 w-4" />

          <div className="w-fit">
            <AlertTitle>{t('want-to-be-a-part-of-a-team')}</AlertTitle>
            <AlertDescription>
              {t('create-an-account-or-login')}
            </AlertDescription>
          </div>

          <LoginButtons className="md:ml-auto mt-2 md:mt-0" />
        </Alert>
      )}

      {user && !user.cs2TeamId && (
        <Alert className="md:flex">
          <FaUsers className="h-4 w-4" />

          <div className="w-fit">
            <AlertTitle>{t('want-to-be-a-part-of-a-team')}</AlertTitle>
            <AlertDescription>
              {t('create-a-team-or-join-an-existing-one')}
            </AlertDescription>
          </div>

          <div className="md:ml-auto mt-2 md:mt-0">
            <CreateTeamDialog>
              <Button>{t('create-a-team')}</Button>
            </CreateTeamDialog>
          </div>
        </Alert>
      )}

      <div className="flex items-center">
        <GoVerified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('verified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        <Suspense fallback={<FallbackCards />}>
          <VerifiedTeamsCards />
        </Suspense>
      </div>

      <div className="flex items-center">
        <GoUnverified className="w-8 h-8 mr-2" />
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold my-4 truncate text-clip">
          {t('unverified-teams')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly border-l-2 ml-4 pl-4 border-black dark:border-white">
        <Suspense fallback={<FallbackCards />}>
          <UnverifiedTeamsCards />
        </Suspense>
      </div>
    </>
  );
}

async function VerifiedTeamsCards() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return teams
    .filter((team) => isCs2TeamVerified(team))
    .map((team) => <TeamCard key={team.id} team={team} />);
}

async function UnverifiedTeamsCards() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return teams
    .filter((team) => !isCs2TeamVerified(team))
    .map((team) => <TeamCard key={team.id} team={team} />);
}

function FallbackCards() {
  return Array(4)
    .fill(0)
    .map((_) => (
      <Card
        key={Math.random()}
        className="w-full transition hover:-translate-y-1 hover:shadow-lg "
      >
        <CardHeader className="relative p-0 w-full aspect-[21/9] space-y-0 overflow-hidden rounded-t-xl">
          <Skeleton className="w-full h-full" />
        </CardHeader>
        <div className="p-3">
          <Skeleton className="w-1/2 h-6" />
        </div>
      </Card>
    ));
}
