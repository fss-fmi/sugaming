import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class Cs2TeamsPostJoinRequestsRespondRequestBodyDto {
  @ApiProperty({
    description: 'The response to the join request.',
    enum: ['ACCEPT', 'DECLINE'],
  })
  @IsEnum(['ACCEPT', 'DECLINE'], {
    message: i18nValidationMessage('validation.isEnum', {
      enum: Object.values(['ACCEPT', 'DECLINE']).join(', '),
    }),
  })
  response: 'ACCEPT' | 'DECLINE';
}
