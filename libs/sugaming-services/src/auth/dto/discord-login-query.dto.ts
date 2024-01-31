import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class DiscordLoginQueryDto {
  @ApiProperty({
    description: 'Authenticating user email address.',
    example: 'email@example.com',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  code?: string;
}

export default DiscordLoginQueryDto;
