import { Module } from '@nestjs/common';
import { Cs2TeamsController } from './cs2-teams.controller';
import { Cs2TeamsService } from './cs2-teams.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../../users/users.service';

@Module({
  controllers: [Cs2TeamsController],
  providers: [Cs2TeamsService, UsersService, PrismaService],
})
export class Cs2TeamsModule {}
