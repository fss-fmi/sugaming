import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsNotCapitanException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You are not captain of this team.', HttpStatus.FORBIDDEN);
    } else {
      super(i18n.t('errors.cs2.teams.notCaptain'), HttpStatus.FORBIDDEN);
    }
  }
}
