import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DiscordModule.forFeature()],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Cs2TeamsService],
})
export class UsersModule {}
