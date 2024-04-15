import { IsInt, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Cs2TeamGetMemberParamsDto {
  @ApiProperty({
    description: 'Team ID.',
    example: 1,
  })
  @IsInt({
    message: i18nValidationMessage('validation.isInt'),
  })
  @Type(() => Number)
  teamId!: number;

  @ApiProperty({
    description: 'Team member ID.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsUUID('4', {
    message: i18nValidationMessage('validation.isUuid'),
  })
  memberId!: string;
}
