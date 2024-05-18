import { FaQuestion } from 'react-icons/fa6';
import { getTranslations } from 'next-intl/server';
import { Card, CardHeader } from '../../common/server';

interface TournamentBracketProps {
  tournament: null;
}

export async function TournamentBracket({
  tournament,
}: TournamentBracketProps) {
  const t = await getTranslations('site.tournament-bracket');

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 grid-rows-[1fr_auto] grid-flow-col">
      <h2 className="text-sm font-medium uppercase text-center">
        {t('quarter-finals')}
      </h2>

      <div className="flex flex-col justify-around gap-y-2 md:gap-y-4 lg:gap-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="flex flex-col justify-between overflow-hidden rounded-sm divide-y">
            <CardHeader className="flex flex-row w-full justify-between p-1 text-xs bg-muted space-y-0">
              <span>11:00, 01.06</span>
              <span>BO3</span>
            </CardHeader>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-sm font-medium uppercase text-center">
        {t('semi-finals')}
      </h2>

      <div className="flex flex-col justify-around gap-y-2 md:gap-y-4 lg:gap-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card className="flex flex-col justify-between overflow-hidden rounded-sm divide-y">
            <CardHeader className="flex flex-row w-full justify-between p-1 text-xs bg-muted space-y-0">
              <span>11:00, 01.06</span>
              <span>BO3</span>
            </CardHeader>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-sm font-medium uppercase text-center">
        {t('final')}
      </h2>

      <div className="flex flex-col justify-around gap-y-2 md:gap-y-4 lg:gap-y-6">
        {Array.from({ length: 1 }).map((_, index) => (
          <Card className="flex flex-col justify-between overflow-hidden rounded-sm divide-y">
            <CardHeader className="flex flex-row w-full justify-between p-1 text-xs bg-muted space-y-0">
              <span>11:00, 01.06</span>
              <span>BO3</span>
            </CardHeader>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>

            <div className="flex flex-row items-center">
              <div className="h-full w-0.5 bg-gray-500 flex-shrink-0" />
              <div className="h-full aspect-square bg-muted">
                <FaQuestion className="w-8 h-8 p-1" />
              </div>
              <span className="mx-1 truncate">TBD</span>
              <span className="ml-auto mx-2">0</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
