import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/users.decorator';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate users using credentials',
    description:
      'Endpoint for authenticating users using email and password credentials.',
  })
  @ApiBody({ type: CredentialsDto })
  @ApiOkResponse({
    description: 'User logged in successfully and access token is returned.',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  async post(@User() user: Omit<Users, 'passwordHash'>): Promise<TokenDto> {
    return this.authService.login(user);
  }
}

export default AuthController;
