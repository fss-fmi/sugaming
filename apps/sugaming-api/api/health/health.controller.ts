import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
@ApiTags('HealthController')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  get(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.prismaHealth.pingCheck('prisma', this.prismaService, {
          timeout: 10000,
        }),
    ]);
  }
}

export default HealthController;
