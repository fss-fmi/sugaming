import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';

export class Cs2MatchGetParamsDto {
  @ApiProperty({
    description: 'CS2 Match ID.',
    example: 1,
  })
  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  matchId!: number;
}
