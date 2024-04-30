import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../../../users/dto/user-public.dto';
import { Cs2TeamBaseDto } from './cs2-team-base.dto';

export class Cs2TeamDto extends Cs2TeamBaseDto {
  @ApiProperty({
    description: 'Team id.',
  })
  id!: number;

  @ApiProperty({
    description: 'Team members.',
    type: [UserPublicDto],
  })
  members!: UserPublicDto[];

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
