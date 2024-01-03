import { IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';

export class PostTeamJoinRequestParamsDto {
  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  teamId: number;
}
