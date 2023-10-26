import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import prismaServiceMock from '../prisma/prisma.service.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne()', () => {
    it('should return user information without the password hash', async () => {
      // Act
      const actual = await service.getByEmail('gosho@losho.com');

      // Assert
      // Should not contain password
      expect(actual).not.toHaveProperty('passwordHash');

      // Should contain other user information
      expect(actual.id).toEqual('4b259124-6c9a-454c-b1eb-9aa4716136bb');
      expect(actual.email).toEqual('gosho@losho.com');
    });

    it('should return null when no such user exists', async () => {
      // Act
      const actual = await service.getByEmail('invalid@email.com');

      // Assert
      expect(actual).toEqual(null);
    });
  });
});
