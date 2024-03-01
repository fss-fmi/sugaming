import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserResponseBodyDto } from '../../../users/dto/user-response-body.dto';
import { Cs2TeamsBaseDto } from './cs2-teams-base.dto';

export class Cs2TeamResponseBodyDto extends Cs2TeamsBaseDto {
  @ApiProperty({
    description: 'Team id.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  id!: string;

  @ApiProperty({
    description: 'Team members.',
    type: [UserResponseBodyDto],
  })
  members!: [UserResponseBodyDto]; // TODO: Adjust type

  @ApiProperty({
    description: 'Team creation date',
  })
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validation.isDateString'),
    },
  )
  createdAt!: Date;

  @ApiProperty({
    description: 'Team last update date.',
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.isDateString') },
  )
  updatedAt!: Date;
}
