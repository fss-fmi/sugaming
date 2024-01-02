import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsNoSuchTeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    super(i18n.t('errors.cs2.teams.noSuchTeam'), HttpStatus.NOT_FOUND);
  }
}