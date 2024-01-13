import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { appConfig } from '../../app/app.config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      ...appConfig.steam,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { user: Omit<User, 'passwordHash'> },
    id: string,
  ) {
    const steamId = id.replace('https://steamcommunity.com/openid/id/', '');
    // If a user is already logged in, link the Steam account
    if (req.user) {
      await this.usersService.linkSteamAccount(req.user.id, steamId);
    }

    // Return the user information
    return this.usersService.getBySteamIdOrThrow(steamId);
  }
}

export default SteamStrategy;
