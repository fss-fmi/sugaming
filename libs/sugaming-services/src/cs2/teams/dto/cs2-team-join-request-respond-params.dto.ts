import { IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';

export class Cs2TeamJoinRequestRespondParamsDto {
  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  teamId!: number;

  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  requestId!: number;
}
