import { Module } from '@nestjs/common';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { SponsorsService } from '@sugaming/sugaming-services/sponsors/sponsors.service';
import { SponsorsController } from './sponsors.controller';

@Module({
  controllers: [SponsorsController],
  providers: [SponsorsService, PrismaService],
})
export class SponsorsModule {}
