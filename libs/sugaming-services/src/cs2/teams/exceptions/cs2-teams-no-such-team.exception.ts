import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsNoSuchTeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('No such team exists.', HttpStatus.NOT_FOUND);
    } else {
      super(i18n.t('errors.cs2.teams.noSuchTeam'), HttpStatus.NOT_FOUND);
    }
  }
}
