import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNotInviteeOfInviteException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You are not an invitee of this invite.', HttpStatus.BAD_REQUEST);
    } else {
      super(i18n.t('errors.users.notInviteeOfInvite'), HttpStatus.BAD_REQUEST);
    }
  }
}
