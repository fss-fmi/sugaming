import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@sugaming/sugaming-services/auth/auth.service';
import { LocalStrategy } from '@sugaming/sugaming-services/auth/strategies/local.strategy';
import { AnonymousStrategy } from '@sugaming/sugaming-services/auth/strategies/anonymous.strategy';
import { DiscordStrategy } from '@sugaming/sugaming-services/auth/strategies/discord.strategy';
import { SteamStrategy } from '@sugaming/sugaming-services/auth/strategies/steam.strategy';
import { appConfig } from '../app/app.config';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(appConfig.jwtAccessToken),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AnonymousStrategy,
    DiscordStrategy,
    SteamStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

export default AuthModule;
