import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../../../users/dto/user-public.dto';
import { GameDevEventBaseDto } from './game-dev-event-base.dto';

export class GameDevEventDto extends GameDevEventBaseDto {
  @ApiProperty({
    description: 'Event ID.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Event participants.',
    type: [UserPublicDto],
  })
  participants!: UserPublicDto[]; // TODO: Fix this

  @ApiProperty({
    description: 'Event creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Event last update date.',
  })
  updatedAt!: Date;
}
