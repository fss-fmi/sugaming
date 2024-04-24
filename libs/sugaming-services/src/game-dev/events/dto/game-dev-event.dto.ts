import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamMemberDto } from '../../../cs2/teams/dto/cs2-team-member.dto';
import { GameDevEventBaseDto } from './game-dev-event-base.dto';

export class GameDevEventDto extends GameDevEventBaseDto {
  @ApiProperty({
    description: 'Event ID.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Event participants.',
    type: [Cs2TeamMemberDto],
  })
  participants!: Cs2TeamMemberDto[]; // TODO: Fix this

  @ApiProperty({
    description: 'Event creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Event last update date.',
  })
  updatedAt!: Date;
}
