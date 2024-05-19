import { ApiProperty } from '@nestjs/swagger';
import { Cs2Tournament } from '@prisma/client';

export class Cs2TournamentBaseDto
  implements
    Pick<
      Cs2Tournament,
      'name' | 'description' | 'coverUrl' | 'location' | 'startDate' | 'endDate'
    >
{
  @ApiProperty({
    description: 'CS2 Tournament name.',
    example: 'spring-series-2024',
  })
  name!: string;

  @ApiProperty({
    description: 'CS2 tournament description.',
    example: 'Example description.',
  })
  description!: string;

  @ApiProperty({
    description: 'CS2 Tournament cover image URL.',
    example: 'https://example.com/image.jpg',
  })
  coverUrl!: string;

  @ApiProperty({
    description: 'CS2 Tournament location.',
    example: 'FMI, Sofia University, Sofia, Bulgaria',
  })
  location!: string;

  @ApiProperty({
    description: 'CS2 Tournament start date.',
    example: '2024-05-10T00:00:00.000Z',
  })
  startDate!: Date;

  @ApiProperty({
    description: 'CS2 Tournament start end date.',
    example: '2024-05-12T00:00:00.000Z',
  })
  endDate!: Date;

  @ApiProperty({
    description: 'CS2 Tournament max teams.',
    example: 8,
  })
  maxTeams!: number;
}
