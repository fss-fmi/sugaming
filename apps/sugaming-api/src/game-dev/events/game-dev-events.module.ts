import { Module } from '@nestjs/common';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { GameDevEventsService } from '@sugaming/sugaming-services/game-dev/events/game-dev-events.service';
import { GameDevEventsController } from './game-dev-events.controller';

@Module({
  controllers: [GameDevEventsController],
  providers: [GameDevEventsService, UsersService, PrismaService],
})
export class GameDevEventsModule {}
