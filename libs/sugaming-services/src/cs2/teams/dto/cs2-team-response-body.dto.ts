import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
// TODO: Fix circular dependency
// eslint-disable-next-line import/no-cycle
import { UserResponseDto } from '../../../users/dto/user-response.dto';
import { Cs2TeamsBaseDto } from './cs2-teams-base.dto';

export class Cs2TeamResponseBodyDto extends Cs2TeamsBaseDto {
  @ApiProperty({
    description: 'Team id.',
  })
  id!: number;

  @ApiProperty({
    description: 'Team members.',
    type: UserResponseDto,
  })
  members!: UserResponseDto; // TODO: Adjust type

  @ApiProperty({
    description: 'Team capitan id.',
  })
  capitanId!: string;

  @ApiProperty({
    description: 'Team creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Team last update date.',
  })
  updatedAt!: Date;
}
