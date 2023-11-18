import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './users.decorator';

@Controller('users')
@ApiTags('UsersController')
export class UsersController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Current user information',
    description: 'Endpoint for gathering current user information.',
  })
  @ApiOkResponse({
    description: 'The user is authenticated and user information is returned.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  getProfile(@User() user: Omit<Users, 'passwordHash'>) {
    return user;
  }
}

export default UsersController;
