import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamInvitation } from '@prisma/client';
import { Cs2TeamMemberDto } from './cs2-team-member.dto';

export class Cs2TeamInvitationResponseDto implements Cs2TeamInvitation {
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
    description: 'Invited user id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  userId!: string;

  @ApiProperty({
    description: 'Invited user.',
    type: Cs2TeamMemberDto,
  })
  user!: Cs2TeamMemberDto;

  @ApiProperty({
    description: 'Invitation creation date.',
  })
  createdAt!: Date;
}
