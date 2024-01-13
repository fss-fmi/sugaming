import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { appConfig } from '../app/app.config';
import { DiscordStrategy } from './strategies/discord.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { SteamStrategy } from './strategies/steam.strategy';

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
