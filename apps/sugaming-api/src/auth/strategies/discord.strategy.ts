import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { appConfig } from '../../app/app.config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      ...appConfig.discord,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { user: Omit<User, 'passwordHash'> },
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    // If user is already logged in, link Discord account
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
