import { Test, TestingModule } from '@nestjs/testing';
import {
  HealthCheckError,
  PrismaHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { ServiceUnavailableException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@sugaming/sugaming-services/prisma/prisma.service';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeAll(() => {
    jest
      .spyOn(PrismaHealthIndicator.prototype, 'pingCheck')
      .mockResolvedValue({ prisma: { status: 'up' } });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      providers: [PrismaService],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getV1()', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return status ok when everything is operational', async () => {
      // Act
      const result = await controller.getV1();

      // Assert
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('info', {
        prisma: { status: 'up' },
        discord: { status: 'up' },
        steam: { status: 'up' },
      });
    });

    it('should return an error when the database is down', async () => {
      jest
        .spyOn(PrismaHealthIndicator.prototype, 'pingCheck')
        .mockImplementation(() => {
          throw new HealthCheckError('prisma is not available', {
            prisma: { status: 'down' },
          });
        });

      // Act
      let error: ServiceUnavailableException | undefined;
      try {
        await controller.getV1();
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).not.toBe(undefined);
      expect(error).toBeInstanceOf(ServiceUnavailableException);
      expect(error.getResponse()).toHaveProperty('status', 'error');
      expect(error.getResponse()).toHaveProperty('error', {
        prisma: { status: 'down' },
      });
      expect(error.getStatus()).toEqual(HttpStatusCode.ServiceUnavailable);
    });
  });
});
