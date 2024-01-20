import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsNoSuchJoinRequestException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'No such requested to join this team exists.',
        HttpStatus.NOT_FOUND,
      );
    } else {
      super(i18n.t('errors.cs2.teams.noJoinRequest'), HttpStatus.NOT_FOUND);
    }
  }
}
