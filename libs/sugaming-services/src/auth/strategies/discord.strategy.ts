import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { libConfig } from '../../config/lib.config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      ...libConfig.discord,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { user: Omit<User, 'passwordHash'> },
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    // If the user is already logged in, link the Discord account
    if (req.user) {
      await this.usersService.linkDiscordAccount(
        req.user.id,
        profile.id,
        accessToken,
        refreshToken,
      );
    }

    // Return the user information
    return this.usersService.getByDiscordIdOrThrow(profile.id);
  }
}

export default DiscordStrategy;
