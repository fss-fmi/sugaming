import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { TeamCard } from '@sugaming/sugaming-ui/lib/components/site/server';

export default async function CS2RankingPage() {
  const teams = await ApiClient.Cs2TeamsApiService.cs2TeamsControllerGetV1({});
  return (
    <>
      <h1>CS2 Teams</h1>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </>
  );
}
