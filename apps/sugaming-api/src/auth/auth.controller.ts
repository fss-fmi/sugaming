import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/users.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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
    @User() user: Omit<Users, 'passwordHash'>,
  ): Promise<LoginDto> {
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
  async postRefreshV1(@User() user: Omit<Users, 'passwordHash'>) {
    return this.authService.login(user);
  }
}

export default AuthController;
