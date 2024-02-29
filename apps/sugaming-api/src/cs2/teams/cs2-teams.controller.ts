import {
  Body,
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
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { JwtAuthGuard } from '@sugaming/sugaming-services/auth/guards/jwt-auth.guard';
import { Cs2TeamsBaseDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-teams-base.dto';
import { Cs2TeamsPostJoinRequestsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-teams-post-join-requests.dto';
import { Cs2TeamsPostJoinRequestsRespondRequestBodyDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-teams-post-join-requests-respond-request-body.dto';
import { Cs2TeamsPostJoinRequestsRespondParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-teams-post-join-requests-respond-params.dto';
import { Cs2TeamsPostJoinRequestsParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-teams-post-join-requests-params.dto';
import { Cs2TeamResponseBodyDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-response-body.dto';
import { UserAuth } from '../../users/user-auth.decorator';

@Controller('cs2/teams')
@ApiTags('CS2 Teams API')
export class Cs2TeamsController {
  constructor(private readonly cs2TeamsService: Cs2TeamsService) {}

  @Get()
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all CS2 teams',
    description: 'Endpoint for getting all CS2 teams.',
  })
  @ApiOkResponse({
    description: 'CS2 teams retrieved successfully.',
    type: [Cs2TeamResponseBodyDto],
  })
  async getV1() {
    return this.cs2TeamsService.getAll();
  }

  @Post()
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new CS2 team',
    description: 'Endpoint for creating new CS2 teams.',
  })
  @ApiBody({ type: Cs2TeamsBaseDto })
  @ApiCreatedResponse({
    description: 'CS2 team created successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  @ApiConflictResponse({
    schema: {
      anyOf: [
        {
          description: 'A team with the same name already exists.',
        },
        {
          description: 'The user is already a part of another team.',
        },
      ],
    },
  })
  async postV1(
    @Body() createTeamDto: Cs2TeamsBaseDto,
    @UserAuth() user: Omit<User, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.create(createTeamDto, user.id);
  }

  @Get(':teamId')
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a specific CS2 team',
    description: 'Endpoint for getting a specific CS2 team by id.',
  })
  @ApiOkResponse({
    description: 'CS2 team retrieved successfully.',
    type: Cs2TeamResponseBodyDto,
  })
  @ApiNotFoundResponse({ description: 'The team specified does not exist.' })
  async getTeamV1(@Param('teamId') teamId: string) {
    return this.cs2TeamsService.getById(parseInt(teamId, 10)); // TODO: better way to handle this
  }

  @Get('current/invitations-sent')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all CS2 team invitations sent',
    description:
      'Endpoint for team captains to get all sent invitations from their team.',
  })
  @ApiOkResponse({
    description: 'CS2 team invitations sent retrieved successfully.',
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
  @ApiForbiddenResponse({
    description: 'The user is not the captain of the team.',
  })
  async getInvitationsSentV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.cs2TeamsService.getInvitationsSent(user.cs2TeamId, user);
  }

  @Get('current/join-requests')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all CS2 team join requests',
    description: 'Endpoint for team captains to get all join requests.',
  })
  @ApiOkResponse({
    description: 'CS2 team join requests retrieved successfully.',
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
  @ApiForbiddenResponse({
    description: 'The user is not the captain of the team.',
  })
  async getJoinRequestsV1(@UserAuth() user: Omit<User, 'passwordHash'>) {
    return this.cs2TeamsService.getJoinRequests(user.cs2TeamId, user);
  }

  @Post(':teamId/join-requests')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new CS2 team join request',
    description: 'Endpoint for users to request to join a specific team.',
  })
  @ApiBody({ type: Cs2TeamsPostJoinRequestsDto })
  @ApiCreatedResponse({
    description: 'CS2 team join request created successfully.',
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
    description: 'The user is already part of the specified team.',
  })
  async postJoinRequestV1(
    @Param() params: Cs2TeamsPostJoinRequestsParamsDto,
    @UserAuth() user: Omit<User, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.createJoinRequest(params.teamId, user);
  }

  @Post(':teamId/join-requests/:requestId/respond')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Respond to a CS2 team join request',
    description:
      'Endpoint for team captains to accept or decline join requests.',
  })
  @ApiBody({ type: Cs2TeamsPostJoinRequestsRespondRequestBodyDto })
  @ApiOkResponse({
    description: 'CS2 team join request accepted or declined successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid user credentials.' })
  @ApiNotFoundResponse({
    schema: {
      anyOf: [
        { description: 'The user no longer exists.' },
        { description: 'The team specified does not exist.' },
        { description: 'The join request specified does not exist.' },
      ],
    },
  })
  @ApiForbiddenResponse({
    description: 'The user is not the captain of the team.',
  })
  @ApiConflictResponse({
    description: 'The user, you are trying to add, is already part of a team.',
  })
  async postJoinRequestsRespondV1(
    @Param() params: Cs2TeamsPostJoinRequestsRespondParamsDto,
    @Body() requestBody: Cs2TeamsPostJoinRequestsRespondRequestBodyDto,
    @UserAuth() user: Omit<User, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.respondToJoinRequest(
      requestBody.response,
      params.teamId,
      params.requestId,
      user,
    );
  }
}
