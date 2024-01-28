import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNotMemberOfCs2TeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You are not a member of a team.', HttpStatus.FORBIDDEN);
    } else {
      super(i18n.t('errors.users.notMemberOfTeam'), HttpStatus.FORBIDDEN);
    }
  }
}
