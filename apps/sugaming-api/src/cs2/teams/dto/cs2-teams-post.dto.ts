import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Color } from '@prisma/client';
import { i18nValidationMessage } from 'nestjs-i18n';
import { appConfig } from '../../../app/app.config';

export class Cs2TeamsPostDto {
  @ApiProperty({
    description: 'Team name.',
    example: 'Example Team Name',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @MinLength(appConfig.cs2Team.name.minLength, {
    message: i18nValidationMessage('validation.minLength'),
  })
  @MaxLength(appConfig.cs2Team.name.maxLength, {
    message: i18nValidationMessage('validation.maxLength'),
  })
  name: string;

  @ApiProperty({
    description: 'Team color.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.required'),
  })
  @IsEnum(Color, {
    message: i18nValidationMessage('validation.isEnum', {
      enum: Object.values(Color).join(', '),
    }),
  })
  color: Color;
}
