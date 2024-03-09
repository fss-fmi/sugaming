import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsUserNotInTeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('The user is not a part of that team.', HttpStatus.FORBIDDEN);
    } else {
      super(i18n.t('errors.cs2.teams.userNotInTeam'), HttpStatus.FORBIDDEN);
    }
  }
}
