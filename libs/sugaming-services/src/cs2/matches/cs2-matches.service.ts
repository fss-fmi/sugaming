import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Cs2MatchesService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getById(matchId: number) {
    const teamQuery = {
      select: {
        id: true,
        name: true,
        color: true,
        capitanId: true,
        createdAt: true,
        updatedAt: true,
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            nickname: true,
            avatarUrl: true,
            cs2TeamId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    };

    return this.prisma.cs2Match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        team1: teamQuery,
        team2: teamQuery,
        tournament: true,
      },
    });
  }
}
