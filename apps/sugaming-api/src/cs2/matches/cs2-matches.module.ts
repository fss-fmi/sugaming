import { Module } from '@nestjs/common';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { Cs2MatchesService } from '@sugaming/sugaming-services/cs2/matches/cs2-matches.service';
import { Cs2MatchesController } from './cs2-matches.controller';

@Module({
  controllers: [Cs2MatchesController],
  providers: [Cs2MatchesService, PrismaService],
})
export class Cs2MatchesModule {}
