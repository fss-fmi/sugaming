import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamDto } from '../../teams/dto/cs2-team.dto';
import { Cs2TournamentBaseDto } from './cs2-tournament-base.dto';

export class Cs2TournamentDto extends Cs2TournamentBaseDto {
  @ApiProperty({
    description: 'Event ID.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'CS2 Tournament teams.',
    type: [Cs2TeamDto], // TODO: Fix type
  })
  teams!: Omit<Cs2TeamDto, 'members'>[];

  @ApiProperty({
    description: 'CS2 Tournament creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'CS2 Tournament last update date.',
  })
  updatedAt!: Date;
}
