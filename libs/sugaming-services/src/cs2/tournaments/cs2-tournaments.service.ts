import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Cs2TournamentsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getByName(tournamentName: string) {
    return this.prisma.cs2Tournament.findFirst({
      where: {
        name: {
          equals: tournamentName.replace(/-/g, ' '),
          mode: 'insensitive',
        },
      },
      include: {
        teams: true,
      },
    });
  }
}
