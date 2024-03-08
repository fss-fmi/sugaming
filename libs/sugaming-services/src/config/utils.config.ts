import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { libConfig } from './lib.config';

export function isCs2TeamVerified(
  team: ApiClient.Cs2TeamResponseBodyDto,
): boolean {
  return (
    team.members['length'] >= libConfig.cs2Team.members.min &&
    team.members['length'] <= libConfig.cs2Team.members.max
  );
}
