import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import Redis from 'ioredis';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { libConfig } from '../../config/lib.config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    @InjectRedis() private readonly redis: Redis,
  ) {
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
      const discordAccount = await this.usersService.linkDiscordAccount(
        req.user.id,
        profile.id,
        accessToken,
        refreshToken,
      );

      // Notify the discord microservice
      await this.redis.publish(
        'users:discord_account_linked',
        JSON.stringify(discordAccount),
      );
    }

    // Return the user information
    return this.usersService.getByDiscordIdOrThrow(profile.id);
  }
}

export default DiscordStrategy;
