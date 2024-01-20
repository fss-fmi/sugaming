import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsAlreadyRequestedToJoinTeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'You have already requested to join this team.',
        HttpStatus.CONFLICT,
      );
    } else {
      super(
        i18n.t('errors.users.alreadyRequestedToJoinTeam'),
        HttpStatus.CONFLICT,
      );
    }
  }
}
