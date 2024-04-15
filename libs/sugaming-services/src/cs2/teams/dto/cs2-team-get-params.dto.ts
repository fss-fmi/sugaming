import { IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Cs2TeamGetParamsDto {
  @ApiProperty({
    description: 'Team ID.',
    example: 1,
  })
  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  teamId!: number;
}
