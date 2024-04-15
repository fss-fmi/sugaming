import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { libConfig } from './lib.config';

export function isCs2TeamVerified(team: ApiClient.Cs2TeamDto): boolean {
  return (
    team.members.length >= libConfig.cs2Team.members.min &&
    team.members.length <= libConfig.cs2Team.members.max
  );
}
