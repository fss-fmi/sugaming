import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { CreateTeamDto } from './dto/create-team.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Cs2TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto, capitanId: string) {
    const i18n = I18nContext.current();

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
}
