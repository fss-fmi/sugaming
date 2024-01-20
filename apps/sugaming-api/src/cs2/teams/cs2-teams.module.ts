import { Module } from '@nestjs/common';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { Cs2TeamsController } from './cs2-teams.controller';

@Module({
  controllers: [Cs2TeamsController],
  providers: [Cs2TeamsService, UsersService, PrismaService],
})
export class Cs2TeamsModule {}
