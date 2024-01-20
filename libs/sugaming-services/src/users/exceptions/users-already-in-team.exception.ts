import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersAlreadyInTeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You are already a member of a team.', HttpStatus.CONFLICT);
    } else {
      super(i18n.t('errors.users.alreadyInTeam'), HttpStatus.CONFLICT);
    }
  }
}
