import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [PrismaService],
  controllers: [HealthController],
})
export class HealthModule {}

export default HealthModule;
