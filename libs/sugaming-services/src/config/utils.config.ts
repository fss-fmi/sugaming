import { libConfig } from './lib.config';

export function isCs2TeamVerified(team: { members: object[] }): boolean {
  return (
    team.members.length >= libConfig.cs2Team.members.min &&
    team.members.length <= libConfig.cs2Team.members.max
  );
}
