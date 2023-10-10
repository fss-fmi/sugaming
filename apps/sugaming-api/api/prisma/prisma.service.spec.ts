import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('should call $connect on initialization', async (): Promise<void> => {
    // Arrange
    const spy = jest
      .spyOn(service, '$connect')
      .mockImplementation(async () => undefined);

    // Act
    await service.onModuleInit();

    // Assert
    expect(spy).toBeCalledTimes(1);

    // Cleanup
    spy.mockRestore();
  });
});
