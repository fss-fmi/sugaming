import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { Cs2TeamsController } from './cs2-teams.controller';

@Module({
  imports: [DiscordModule.forFeature()],
  controllers: [Cs2TeamsController],
  providers: [Cs2TeamsService, PrismaService, UsersService],
})
export class Cs2TeamsModule {}
