import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamDto } from '../../teams/dto/cs2-team.dto';
import { Cs2MatchBaseDto } from './cs2-match-base.dto';

export class Cs2MatchDto extends Cs2MatchBaseDto {
  @ApiProperty({
    description: 'CS2 Match ID.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'CS2 Match team 1.',
    type: Cs2TeamDto,
  })
  team1!: Cs2TeamDto;

  @ApiProperty({
    description: 'CS2 Match team 2.',
    type: Cs2TeamDto,
  })
  team2!: Cs2TeamDto;

  @ApiProperty({
    description: 'CS2 Match creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'CS2 Tournament last update date.',
  })
  updatedAt!: Date;
}
