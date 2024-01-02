import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './users.decorator';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post(':id/cs2-team-invites')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Invite a user to a CS2 team',
    description: 'Endpoint for creating user CS2 team invitations.',
  })
  @ApiCreatedResponse({
    description: 'CS2 team invitation created successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  @ApiForbiddenResponse({
    schema: {
      anyOf: [
        {
          description: 'The user cannot invite themselves.',
        },
        {
          description: 'The user is not a member of a CS2 team.',
        },
        {
          description: 'Only the captain of the team can invite users.',
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'The user to invite does not exist.',
  })
  postCs2TeamInviteV1(
    @Param('id') inviteeId: string,
    @User() user: Omit<Users, 'passwordHash'>,
  ) {
    return this.usersService.createCs2TeamInvitation(user, inviteeId);
  }
}

export default UsersController;
