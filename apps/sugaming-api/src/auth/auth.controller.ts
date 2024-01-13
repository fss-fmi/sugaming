import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { UserAuth } from '../users/users.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { SteamAuthGuard } from './guards/steam-auth.guard';

@Controller({ path: 'auth' })
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version(['1'])
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user using credentials',
    description:
      'Endpoint for authenticating users using email and password credentials.',
  })
  @ApiBody({ type: CredentialsDto })
  @ApiOkResponse({
    description:
      'User logged in successfully and access token and information is returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  async postLoginV1(
    @UserAuth() user: Omit<User, 'passwordHash'>,
  ): Promise<LoginDto> {
    return this.authService.login(user);
  }

  @Get('login/discord')
  @Version(['1'])
  @UseGuards(OptionalJwtAuthGuard, DiscordAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user using Discord',
    description: 'Endpoint for authenticating users using Discord.',
  })
  @ApiOkResponse({
    description:
      'User logged in successfully / Account linked successfully and access token and information is returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Discord token.' })
  @ApiNotFoundResponse({
    description: 'No user is linked to this Discord account.',
  })
  @ApiConflictResponse({
    description: 'Discord account already linked to an user.',
  })
  async postLoginDiscordV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.authService.login(user);
  }

  @Get('login/steam')
  @Version(['1'])
  @UseGuards(OptionalJwtAuthGuard, SteamAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user using Steam',
    description: 'Endpoint for authenticating users using Steam.',
  })
  @ApiOkResponse({
    description:
      'User logged in successfully / Account linked successfully and access token and information is returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Steam token.' })
  @ApiNotFoundResponse({
    description: 'No user is linked to this Steam account.',
  })
  @ApiConflictResponse({
    description: 'Steam account already linked to an user.',
  })
  async postLoginSteamV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @Version(['1'])
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh an access token',
    description: 'Endpoint for refreshing existing access tokens.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User refresh token.',
    example: 'Refresh <token>',
  })
  @ApiOkResponse({
    description: 'A new access token is generated and returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  async postRefreshV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.authService.login(user);
  }
}

export default AuthController;
