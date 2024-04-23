import { ApiProperty } from '@nestjs/swagger';
import { GameDevEventBaseDto } from './game-dev-event-base.dto';

export class GameDevEventDto extends GameDevEventBaseDto {
  @ApiProperty({
    description: 'Event ID.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Event creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Event last update date.',
  })
  updatedAt!: Date;
}
