import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserRequestBodyDto } from '@sugaming/sugaming-services/users/dto/user-request-body.dto';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { JwtAuthGuard } from '@sugaming/sugaming-services/auth/guards/jwt-auth.guard';
import { UserResponseBodyDto } from '@sugaming/sugaming-services/users/dto/user-response-body.dto';
import { UsersPostCurrentCs2TeamInvitesRespondRequestBodyDto } from '@sugaming/sugaming-services/users/dto/users-post-current-cs2-team-invites-respond-request-body.dto';
import { UsersPostCurrentCs2TeamInvitesRespondParamsDto } from '@sugaming/sugaming-services/users/dto/users-post-current-cs2-team-invites-respond-params.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserAuth } from './user-auth.decorator';
import { appConfig } from '../app/app.config';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Version(['1'])
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor(
      'universityProofImages',
      libConfig.user.universityProofImages.max,
      {
        storage: diskStorage({
          destination: `${appConfig.multer.destination}/university-proof-images`,
          filename: (req, file, cb) => {
            const name = file.originalname.split('.')[0];
            const extension = extname(file.originalname);
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}-${name}${extension}`);
          },
        }),
      },
    ),
  )
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Endpoint for registering a new user.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UserRequestBodyDto })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
  })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          description: 'The email is already in use.',
        },
        {
          description: 'The nickname is already in use.',
        },
      ],
    },
  })
  async postUsersV1(
    @Body() user: UserRequestBodyDto,
    @UploadedFiles() universityProofImages: Array<Express.Multer.File>,
  ) {
    return this.usersService.registerUser(user, universityProofImages);
  }

  @Get('current')
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
    type: UserResponseBodyDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  getCurrentV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return user;
  }

  @Get('current/cs2-team-invites')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user CS2 team invitations',
    description: 'Endpoint for getting user CS2 team invitations.',
  })
  @ApiOkResponse({
    description: 'User CS2 team invitations returned successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  @ApiNotFoundResponse({
    description: 'The user does not exist.',
  })
  getUserCs2TeamInvitesV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.usersService.getUserCs2TeamInvites(user);
  }

  @Post(':userId/cs2-team-invites')
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
    @UserAuth() user: Omit<User, 'passwordHash'>,
  ) {
    return this.usersService.createCs2TeamInvitation(user, inviteeId);
  }

  @Post('current/cs2-team-invites/:inviteId/respond')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Respond to a CS2 team invitation',
    description:
      'Endpoint for users to accept or decline CS2 team invitations.',
  })
  @ApiBody({ type: UsersPostCurrentCs2TeamInvitesRespondRequestBodyDto })
  @ApiOkResponse({
    description: 'CS2 team invitation accepted or declined successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        { description: 'The team does not exist.' },
        { description: 'The invitation does not exist.' },
      ],
    },
  })
  @ApiForbiddenResponse({
    description: 'The user is not the invitee of the invitation.',
  })
  @ApiConflictResponse({
    description: 'The user is already part of a team.',
  })
  async postCurrentCs2TeamInvitesRespondV1(
    @Param() params: UsersPostCurrentCs2TeamInvitesRespondParamsDto,
    @UserAuth() user: Omit<User, 'passwordHash'>,
    @Body() requestBody: UsersPostCurrentCs2TeamInvitesRespondRequestBodyDto,
  ) {
    return this.usersService.respondToCs2TeamInvite(
      requestBody.response,
      params.inviteId,
      user,
    );
  }

  @Delete('/current/cs2/team/')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Leave a CS2 team',
    description: 'Endpoint for users to leave a specific team.',
  })
  @ApiOkResponse({
    description: 'CS2 team left successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        { description: 'The user no longer exists.' },
        { description: 'The team specified does not exist.' },
      ],
    },
  })
  @ApiConflictResponse({
    description: 'The user is not part of the specified team.',
  })
  async postLeaveTeamV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.usersService.leave(user);
  }
}

export default UsersController;
