import { Module } from '@nestjs/common';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { Cs2TournamentsService } from '@sugaming/sugaming-services/cs2/tournaments/cs2-tournaments.service';
import { Cs2TournamentsController } from './cs2-tournaments.controller';

@Module({
  controllers: [Cs2TournamentsController],
  providers: [Cs2TournamentsService, PrismaService],
})
export class Cs2TournamentsModule {}
