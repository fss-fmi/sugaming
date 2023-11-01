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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/users.decorator';

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CredentialsDto })
  @ApiOkResponse({ description: 'User logged in.' })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  async login(@User() user: Omit<Users, 'passwordHash'>) {
    return this.authService.login(user);
  }
}

export default AuthController;
