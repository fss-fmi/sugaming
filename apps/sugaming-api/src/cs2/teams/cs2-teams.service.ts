import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PostTeamDto } from './dto/post-team.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Cs2TeamsNameAlreadyExistsException } from './exceptions/cs2-teams-name-already-exists.exception';
import { Cs2TeamsAlreadyInTeamException } from './exceptions/cs2-teams-already-in-team.exception';
import { UsersService } from '../../users/users.service';
import { Cs2TeamsNoSuchTeamException } from './exceptions/cs2-teams-no-such-team.exception';
import { Cs2TeamsAlreadyRequestedToJoinTeamException } from './exceptions/cs2-teams-already-requested-to-join-team.exception';
import { Cs2TeamsNotCapitanException } from './exceptions/cs2-teams-not-capitan.exception';
import { Cs2TeamsNoSuchJoinRequestException } from './exceptions/cs2-teams-no-such-join-request.exception';

@Injectable()
export class Cs2TeamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getById(id: number) {
    return this.prisma.cs2Teams.findUnique({
      where: {
        id,
      },
    });
  }

  async getByIdOrThrow(id: number) {
    const team = await this.getById(id);

    if (!team) {
      throw new Cs2TeamsNoSuchTeamException();
    }

    return team;
  }

  async create(createTeamDto: PostTeamDto, capitanId: string) {
    // Check if team name is already taken
    const teamNameExists = await this.prisma.cs2Teams.findFirst({
      where: {
        name: createTeamDto.name,
      },
    });

    if (teamNameExists) {
      throw new Cs2TeamsNameAlreadyExistsException();
    }

    // Check if user is already in a team
    const teamsCaptainIsPartOf = await this.prisma.cs2Teams.findMany({
      where: {
        OR: [{ capitanId }, { members: { some: { id: capitanId } } }],
      },
    });

    if (teamsCaptainIsPartOf.length > 0) {
      throw new Cs2TeamsAlreadyInTeamException();
    }

    // Create the team
    return this.prisma.cs2Teams.create({
      data: {
        name: createTeamDto.name,
        color: createTeamDto.color,
        capitanId,
        members: {
          connect: {
            id: capitanId,
          },
        },
      },
    });
  }

  async getJoinRequests(teamId: number, user: Omit<Users, 'passwordHash'>) {
    // Validate that the user exists
    await this.usersService.getByIdOrThrow(user.id);

    // Validate that the team exists/the user is the captain of the team
    const team = await this.getByIdOrThrow(teamId);

    if (team.capitanId !== user.id) {
      throw new Cs2TeamsNotCapitanException();
    }

    // Get the requests, join with the user table
    return this.prisma.cs2TeamRequest.findMany({
      where: {
        teamId,
      },
      include: {
        user: true,
      },
    });
  }

  async createJoinRequest(teamId: number, user: Omit<Users, 'passwordHash'>) {
    // Validate that the user exists
    await this.usersService.getByIdOrThrow(user.id);

    // Validate that the team exists
    await this.getByIdOrThrow(teamId);

    // Validate that the user is not already a part of the team
    const existingTeam = await this.prisma.cs2Teams.findFirst({
      where: {
        members: { some: { id: user.id } },
      },
    });

    if (existingTeam) {
      throw new Cs2TeamsAlreadyInTeamException();
    }

    // Validate that the user does not already have a pending request
    const existingRequest = await this.prisma.cs2TeamRequest.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existingRequest) {
      throw new Cs2TeamsAlreadyRequestedToJoinTeamException();
    }

    // Create the request
    return this.prisma.cs2TeamRequest.create({
      data: {
        teamId,
        userId: user.id,
      },
    });
  }

  async acceptJoinRequest(
    teamId: number,
    requestId: number,
    user: Omit<Users, 'passwordHash'>,
  ) {
    // Validate that the user exists
    await this.usersService.getByIdOrThrow(user.id);

    // Validate that the team exists
    const team = await this.getByIdOrThrow(teamId);

    // Validate that the user is the captain of the team
    if (team.capitanId !== user.id) {
      throw new Cs2TeamsNotCapitanException();
    }

    // Validate that the request exists/request is for the specified team
    const request = await this.prisma.cs2TeamRequest.findFirst({
      where: {
        id: requestId,
      },
    });

    if (!request || request.teamId !== teamId) {
      throw new Cs2TeamsNoSuchJoinRequestException();
    }

    // Validate that the user is not already a part of the team
    const existingTeam = await this.prisma.cs2Teams.findFirst({
      where: {
        members: { some: { id: request.userId } },
      },
    });

    if (existingTeam) {
      throw new Cs2TeamsAlreadyInTeamException();
    }

    // Delete the request
    await this.prisma.cs2TeamRequest.delete({
      where: {
        id: requestId,
      },
    });

    // Add the user to the team
    return this.prisma.cs2Teams.update({
      where: {
        id: teamId,
      },
      data: {
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}
