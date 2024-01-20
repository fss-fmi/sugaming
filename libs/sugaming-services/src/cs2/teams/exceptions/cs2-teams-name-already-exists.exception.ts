import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsNameAlreadyExistsException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('A team with the same name already exists.', HttpStatus.CONFLICT);
    } else {
      super(i18n.t('errors.cs2.teams.nameAlreadyExists'), HttpStatus.CONFLICT);
    }
  }
}
