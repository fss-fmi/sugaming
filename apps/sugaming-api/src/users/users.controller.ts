import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Version,
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
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  @Get('profile')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Current user information',
    description: 'Endpoint for gathering current user information.',
  })
  @ApiOkResponse({
    description: 'The user is authenticated and user information is returned.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  getProfileV1(@User() user: Omit<Users, 'passwordHash'>) {
    return user;
  }
}

export default UsersController;
