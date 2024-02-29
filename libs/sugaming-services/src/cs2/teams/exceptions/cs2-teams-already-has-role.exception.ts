import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsAlreadyHasRoleException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('The user already has a role.', HttpStatus.CONFLICT);
    } else {
      super(i18n.t('errors.cs2.teams.alreadyHasRole'), HttpStatus.CONFLICT);
    }
  }
}
