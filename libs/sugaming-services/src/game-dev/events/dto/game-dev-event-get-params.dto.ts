import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class GameDevEventGetParamsDto {
  @ApiProperty({
    description: 'Event name.',
    example: 'sugaming-game-jam-2024',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  eventName!: string;
}
