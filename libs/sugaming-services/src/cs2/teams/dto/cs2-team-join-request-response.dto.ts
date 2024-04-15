import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamInvitation, Cs2TeamRequest } from '@prisma/client';
import { Cs2TeamMemberDto } from './cs2-team-member.dto';

export class Cs2TeamJoinRequestResponseDto implements Cs2TeamRequest {
  @ApiProperty({
    description: 'Team invitation id.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Team id.',
    example: 1,
  })
  teamId!: number;

  @ApiProperty({
    description: 'Requester user id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  userId!: string;

  @ApiProperty({
    description: 'Requester user model.',
    type: Cs2TeamMemberDto,
  })
  user!: Cs2TeamMemberDto;

  @ApiProperty({
    description: 'Invitation creation date.',
  })
  createdAt!: Date;
}
