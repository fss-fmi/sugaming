import { DiscordAccount, SteamAccount } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserSteamAccountDto implements SteamAccount {
  @ApiProperty({
    description: 'Steam account id.',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  userId!: string;

  @ApiProperty({
    description: 'Steam account id.',
    example: '123456789012345678',
  })
  steamId!: string;

  @ApiProperty({
    description: 'Discord account link creation date.',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Discord account link update date.',
  })
  updatedAt!: Date;
}
