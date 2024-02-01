import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class DiscordLoginQueryDto {
  @ApiProperty({
    description: 'Discord authentication code.',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  code?: string;
}

export default DiscordLoginQueryDto;
