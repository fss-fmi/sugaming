import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { GameDevEventDto } from '../../game-dev/events/dto/game-dev-event.dto';
import { UserSteamAccountDto } from './user-steam-account.dto';
import { UserDiscordAccountDto } from './user-discord-account.dto';
import { Cs2TeamDto } from '../../cs2/teams/dto/cs2-team.dto';
import { UserBaseDto } from './user-base.dto';

export class UserDto extends UserBaseDto {
  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  id!: string;

  @ApiProperty({
    description: 'Has user completed onboarding.',
    example: true,
  })
  @IsBoolean({
    message: i18nValidationMessage('validation.isBoolean'),
  })
  isOnboardingCompleted!: boolean;

  @ApiProperty({
    description: 'User Discord account information.',
  })
  discord!: UserDiscordAccountDto | null;

  @ApiProperty({
    description: 'User Steam account information.',
  })
  steam!: UserSteamAccountDto | null;

  @ApiProperty({
    description: 'User avatar URL.',
  })
  avatarUrl?: string;

  @ApiProperty({
    description: 'User CS2 id team.',
  })
  cs2TeamId!: number;

  @ApiProperty({
    description: 'User Counter-Strike 2 team.',
    type: Cs2TeamDto,
  })
  cs2Team!: Cs2TeamDto;

  @ApiProperty({
    description: 'User game dev events.',
  })
  gameDevEvents!: GameDevEventDto[]; // TODO: Correct

  @ApiProperty({
    description: 'User creation date',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'User last update date',
  })
  updatedAt!: Date;
}

export default UserDto;
