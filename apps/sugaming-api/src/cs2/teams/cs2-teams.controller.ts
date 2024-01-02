import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { Cs2TeamsService } from './cs2-teams.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PostTeamDto } from './dto/post-team.dto';
import { User } from '../../users/users.decorator';

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
}
