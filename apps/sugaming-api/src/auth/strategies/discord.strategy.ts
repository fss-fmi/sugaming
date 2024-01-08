import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { appConfig } from '../../app/app.config';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(appConfig.discord);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken, refreshToken, profile);
    return true;
  }
}

export default DiscordStrategy;
