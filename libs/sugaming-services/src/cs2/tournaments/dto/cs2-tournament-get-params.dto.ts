import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class Cs2TournamentGetParamsDto {
  @ApiProperty({
    description: 'CS2 Tournament name.',
    example: 'summer-series-2024',
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  tournamentName!: string;
}
