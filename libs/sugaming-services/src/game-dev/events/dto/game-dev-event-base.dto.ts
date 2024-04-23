import { ApiProperty } from '@nestjs/swagger';
import { GameDevEvent } from '@prisma/client';

export class GameDevEventBaseDto
  implements
    Pick<
      GameDevEvent,
      | 'name'
      | 'description'
      | 'coverUrl'
      | 'location'
      | 'startDate'
      | 'endDate'
      | 'facebookEventUrl'
    >
{
  @ApiProperty({
    description: 'Event name.',
    example: 'sugaming-game-jam-2024',
  })
  name!: string;

  @ApiProperty({
    description: 'Event description.',
    example: 'Example description.',
  })
  description!: string;

  @ApiProperty({
    description: 'Event cover image URL.',
    example: 'https://example.com/image.jpg',
  })
  coverUrl!: string;

  @ApiProperty({
    description: 'Event location.',
    example: 'FMI, Sofia University, Sofia, Bulgaria',
  })
  location!: string;

  @ApiProperty({
    description: 'Event start date.',
    example: '2024-05-10T00:00:00.000Z',
  })
  startDate!: Date;

  @ApiProperty({
    description: 'Event end date.',
    example: '2024-05-12T00:00:00.000Z',
  })
  endDate!: Date;

  @ApiProperty({
    description: 'Event Facebook event URL.',
    example: 'https://www.facebook.com/events/1234567890/',
  })
  facebookEventUrl!: string | null;

  @ApiProperty({
    description: 'Event max participants.',
    example: 40,
  })
  maxParticipants!: number;
}
