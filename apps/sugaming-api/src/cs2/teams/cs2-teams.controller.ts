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
import { Users } from '@prisma/client';
import { Cs2TeamsService } from './cs2-teams.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PostTeamDto } from './dto/post-team.dto';
import { User } from '../../users/users.decorator';
import { PostTeamJoinRequestDto } from './dto/post-team-join-request.dto';

@Controller('cs2/teams')
@ApiTags('CS2 Teams API')
export class Cs2TeamsController {
  constructor(private readonly cs2TeamsService: Cs2TeamsService) {}

  @Post()
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new CS2 team',
    description: 'Endpoint for creating new CS2 teams.',
  })
  @ApiBody({ type: PostTeamDto })
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
    @Body() createTeamDto: PostTeamDto,
    @User() user: Omit<Users, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.create(createTeamDto, user.id);
  }

  @Post(':id/join-requests')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new CS2 team join request',
    description: 'Endpoint for users to request to join a specific team.',
  })
  @ApiBody({ type: PostTeamJoinRequestDto })
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
  async postTeamJoinRequestV1(
    @Param('id') teamId: number,
    @User() user: Omit<Users, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.createJoinRequest(teamId, user);
  }

  @Get(':id/join-requests')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
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
  async getTeamJoinRequestsV1(
    @Param('id') teamId: number,
    @User() user: Omit<Users, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.getJoinRequests(teamId, user);
  }

  @Post(':id/join-requests/:requestId/accept')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Accept a CS2 team join request',
    description: 'Endpoint for team captains to accept join requests.',
  })
  @ApiBody({ type: PostTeamJoinRequestDto })
  @ApiOkResponse({
    description: 'CS2 team join request accepted successfully.',
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
  @ApiConflictResponse({
    description: 'The user is already part of a team.',
  })
  async acceptTeamJoinRequestV1(
    @Param('id') teamId: number,
    @Param('requestId') requestId: number,
    @User() user: Omit<Users, 'passwordHash'>,
  ) {
    return this.cs2TeamsService.acceptJoinRequest(teamId, requestId, user);
  }
}
