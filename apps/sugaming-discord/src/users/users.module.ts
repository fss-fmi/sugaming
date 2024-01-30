import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DiscordModule.forFeature()],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
