import { Cs2Match } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Cs2MatchBaseDto
  implements Pick<Cs2Match, 'team1Id' | 'team2Id' | 'tournamentId'>
{
  @ApiProperty({
    description: 'CS2 Team 1 ID.',
    example: 1,
  })
  team1Id!: number;

  @ApiProperty({
    description: 'CS2 Team 2 ID.',
    example: 2,
  })
  team2Id!: number;

  @ApiProperty({
    description: 'CS2 Tournament ID.',
    example: 1,
  })
  tournamentId!: number;
}
