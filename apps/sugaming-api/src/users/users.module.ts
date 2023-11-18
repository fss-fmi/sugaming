import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  providers: [UsersService, PrismaService, JwtStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

export default UsersModule;
