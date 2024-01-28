import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [PrismaService],
  controllers: [HealthController],
})
export class HealthModule {}

export default HealthModule;
