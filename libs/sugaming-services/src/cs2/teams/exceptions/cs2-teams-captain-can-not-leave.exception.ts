import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class Cs2TeamsCaptainCanNotLeaveException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('The team captain cannot leave the team.', HttpStatus.FORBIDDEN);
    } else {
      super(i18n.t('errors.users.captainCanNotLeave'), HttpStatus.FORBIDDEN);
    }
  }
}
