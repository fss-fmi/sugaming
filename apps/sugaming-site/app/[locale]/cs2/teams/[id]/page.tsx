import { getTranslations } from 'next-intl/server';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { TeamBanner } from '@sugaming/sugaming-ui/lib/components/site/team-banner/team-banner';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default async function CS2TeamPage() {
  const t = await getTranslations('cs2-teams-page');
  const locale = useLocale();
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  const team = teams[0]; // TODO: Refactor to get team by id

  return (
    <Card className="w-full mt-12">
      <CardHeader className="relative p-0 w-full aspect-[12/3] space-y-0 overflow-hidden rounded-t-xl">
        <TeamBanner team={team} />

        <Button
          variant="outline"
          className="absolute top-1 left-1 rounded-xl"
          asChild
        >
          <Link href={`/${locale}/cs2/teams`}>
            <FaArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase my-2 truncate text-clip">
            {team.name}
          </h1>
        </div>
      </CardContent>
    </Card>
  );
}
