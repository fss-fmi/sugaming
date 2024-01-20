import { Module } from '@nestjs/common';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { JwtStrategy } from '@sugaming/sugaming-services/auth/strategies/jwt.strategy';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, JwtStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

export default UsersModule;
