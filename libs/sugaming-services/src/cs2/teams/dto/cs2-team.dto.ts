import { ApiProperty } from '@nestjs/swagger';
import { Cs2TeamMemberDto } from './cs2-team-member.dto';
import { Cs2TeamBaseDto } from './cs2-team-base.dto';

export class Cs2TeamDto extends Cs2TeamBaseDto {
  @ApiProperty({
    description: 'Team id.',
  })
  id!: number;

  @ApiProperty({
    description: 'Team members.',
    type: [Cs2TeamMemberDto],
  })
  members!: Cs2TeamMemberDto[];

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
