import {
  Body,
  Controller,
  Delete,
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
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { JwtAuthGuard } from '@sugaming/sugaming-services/auth/guards/jwt-auth.guard';
import { Cs2TeamBaseDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-base.dto';
import { Cs2TeamJoinRequestRespondRequestBodyDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-join-request-respond-request-body.dto';
import { Cs2TeamJoinRequestRespondParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-join-request-respond-params.dto';
import { Cs2TeamJoinRequestParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-join-request-params.dto';
import { Cs2TeamDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team.dto';
import { UserDto } from '@sugaming/sugaming-services/users/dto/user.dto';
import { Cs2TeamGetParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-get-params.dto';
import { Cs2TeamInvitationResponseDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-invitation-response.dto';
import { Cs2TeamJoinRequestResponseDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-join-request-response.dto';
import { Cs2TeamGetMemberParamsDto } from '@sugaming/sugaming-services/cs2/teams/dto/cs2-team-get-member-params.dto';
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
    type: [Cs2TeamDto],
  })
  async getV1(): Promise<Cs2TeamDto[]> {
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
  @ApiBody({ type: Cs2TeamBaseDto })
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
    @Body() createTeamDto: Cs2TeamBaseDto,
    @UserAuth() user: UserDto,
  ): Promise<Omit<Cs2TeamDto, 'members'>> {
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
    type: Cs2TeamDto,
  })
  @ApiNotFoundResponse({ description: 'The team specified does not exist.' })
  async getTeamV1(@Param() params: Cs2TeamGetParamsDto): Promise<Cs2TeamDto> {
    return this.cs2TeamsService.getById(params.teamId);
  }

  @Get(':teamId/invitations-sent')
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
    type: [Cs2TeamInvitationResponseDto],
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
  async getInvitationsSentV1(
    @Param() params: Cs2TeamGetParamsDto,
    @UserAuth() user: UserDto,
  ): Promise<Cs2TeamInvitationResponseDto[]> {
    return this.cs2TeamsService.getInvitationsSent(params.teamId, user);
  }

  @Get(':teamId/join-requests')
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
    type: [Cs2TeamJoinRequestResponseDto],
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
  async getJoinRequestsV1(
    @Param() params: Cs2TeamGetParamsDto,
    @UserAuth() user: UserDto,
  ): Promise<Cs2TeamJoinRequestResponseDto[]> {
    return this.cs2TeamsService.getJoinRequests(params.teamId, user);
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
  @ApiBody({ type: Cs2TeamJoinRequestResponseDto })
  @ApiCreatedResponse({
    description: 'CS2 team join request created successfully.',
    type: Cs2TeamJoinRequestResponseDto,
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
    @Param() params: Cs2TeamJoinRequestParamsDto,
    @UserAuth() user: UserDto,
  ): Promise<Omit<Cs2TeamJoinRequestResponseDto, 'user'>> {
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
  @ApiBody({ type: Cs2TeamJoinRequestRespondRequestBodyDto })
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
    @Param() params: Cs2TeamJoinRequestRespondParamsDto,
    @Body() requestBody: Cs2TeamJoinRequestRespondRequestBodyDto,
    @UserAuth() user: UserDto,
  ): Promise<{ message: string }> {
    return this.cs2TeamsService.respondToJoinRequest(
      requestBody.response,
      params.teamId,
      params.requestId,
      user,
    );
  }

  @Delete(':teamId/members/:memberId')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove a user from a CS2 team',
    description: 'Endpoint for team captains to remove a user from their team.',
  })
  @ApiOkResponse({
    description: 'User removed from the team successfully.',
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
  async deleteMemberV1(
    @Param() params: Cs2TeamGetMemberParamsDto,
    @UserAuth() user: UserDto,
  ) {
    return this.cs2TeamsService.removeMember(
      params.teamId,
      params.memberId,
      user,
    );
  }
}
