import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/server';
import { isCs2TeamVerified } from '@sugaming/sugaming-services/config/utils.config';

export default async function CS2TeamsPage() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return (
    <>
      <h1 className="text-2xl sm:text-6xl font-black uppercase my-4 truncate text-clip">
        Counter-Strike 2 Teams
      </h1>

      <h2>Verified Teams</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly">
        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}

        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}

        {teams
          .filter((team) => isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
      </div>

      <h2>Unverified Teams</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-evenly">
        {teams
          .filter((team) => !isCs2TeamVerified(team))
          .map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
      </div>
    </>
  );
}
