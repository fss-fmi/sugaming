import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Cs2TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto, capitanId: string) {
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
