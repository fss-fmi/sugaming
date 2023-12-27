import { Controller, Get, Version } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
@ApiTags('Health API')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @Version(['1'])
  @HealthCheck()
  @ApiOperation({
    summary: 'Healthcheck',
    description:
      'Healthcheck endpoint, validating the correct operation of the API and its dependencies (such as prisma, external APIs, etc.)',
  })
  getV1() {
    return this.health.check([
      () =>
        this.prismaHealth.pingCheck('prisma', this.prismaService, {
          timeout: 10000,
        }),
    ]);
  }
}

export default HealthController;
