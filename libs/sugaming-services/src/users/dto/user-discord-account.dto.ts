import { DiscordAccount } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDiscordAccountDto implements DiscordAccount {
  @ApiProperty({
    description: 'Discord account id.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  userId!: string;

  @ApiProperty({
    description: 'Discord account id.',
    example: '123456789012345678',
  })
  discordId!: string;

  @ApiProperty({
    description: 'Discord account access token.',
    example: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Discord account refresh token.',
    example: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Discord account link creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Discord account link update date.',
  })
  updatedAt!: Date;
}
