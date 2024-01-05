import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNotMemberOfCs2TeamException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    super(
      i18n.t('errors.users.notMemberOfTeamException'),
      HttpStatus.FORBIDDEN,
    );
  }
}
