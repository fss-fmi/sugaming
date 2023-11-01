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

  describe('getByEmail()', () => {
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

  describe('verifyCredentials()', () => {
    it('should return true if the email and password are correct', async () => {
      // Act
      const actual = await service.verifyCredentials(
        'gosho@losho.com',
        'GoshoLoshoTestPassword',
      );

      // Assert
      expect(actual).toBe(true);
    });

    it('should return false if the email is nonexistent', async () => {
      // Act
      const actual = await service.verifyCredentials(
        'invalid@email.com',
        'GoshoLoshoTestPassword',
      );

      // Assert
      expect(actual).toBe(false);
    });

    it('should return false if the password is incorrect', async () => {
      // Act
      const actual = await service.verifyCredentials(
        'gosho@losho.com',
        'WrongPassword',
      );

      // Assert
      expect(actual).toBe(false);
    });
  });
});
