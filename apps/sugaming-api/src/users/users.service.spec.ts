import { Test, TestingModule } from '@nestjs/testing';
import { I18nContext } from 'nestjs-i18n';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import prismaServiceMock from '../prisma/prisma.service.mock';
import { exampleUser, exampleUserCredentials } from './users.mock';
import { UsersNoSuchUserException } from './exceptions/users-no-such-user.exception';

describe('UsersService', () => {
  let service: UsersService;

  jest.mock('nestjs-i18n');
  I18nContext.current = jest.fn().mockReturnValue({
    t: () => jest.fn(),
  });

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

  describe('getById()', () => {
    it('should return user information without the password hash', async () => {
      // Act
      const actual = await service.getById(exampleUser.id);

      // Assert
      // Should not contain password
      expect(actual).not.toHaveProperty('passwordHash');

      // Should contain other user information
      expect(actual.id).toEqual(exampleUser.id);
      expect(actual.email).toEqual(exampleUser.email);
    });

    it('should return null when no such user exists', async () => {
      // Act
      const actual = await service.getById('invalid-id');

      // Assert
      expect(actual).toEqual(null);
    });
  });

  describe('getByIdOrThrow()', () => {
    it('should return user information without the password hash', async () => {
      // Act
      const actual = await service.getByIdOrThrow(exampleUser.id);

      // Assert
      // Should not contain password
      expect(actual).not.toHaveProperty('passwordHash');

      // Should contain other user information
      expect(actual.id).toEqual(exampleUser.id);
      expect(actual.email).toEqual(exampleUser.email);
    });

    it('should throw an error when no such user exists', async () => {
      // Act
      const actual = service.getByIdOrThrow('invalid-id');

      // Assert
      await expect(actual).rejects.toThrow(UsersNoSuchUserException);
    });
  });

  describe('getByEmail()', () => {
    it('should return user information without the password hash', async () => {
      // Act
      const actual = await service.getByEmail(exampleUser.email);

      // Assert
      // Should not contain password
      expect(actual).not.toHaveProperty('passwordHash');

      // Should contain other user information
      expect(actual.id).toEqual(exampleUser.id);
      expect(actual.email).toEqual(exampleUser.email);
    });

    it('should return null when no such user exists', async () => {
      // Act
      const actual = await service.getByEmail('invalid@email.com');

      // Assert
      expect(actual).toEqual(null);
    });
  });

  describe('getByEmailOrThrow()', () => {
    it('should return user information without the password hash', async () => {
      // Act
      const actual = await service.getByEmailOrThrow(exampleUser.email);

      // Assert
      // Should not contain password
      expect(actual).not.toHaveProperty('passwordHash');

      // Should contain other user information
      expect(actual.id).toEqual(exampleUser.id);
      expect(actual.email).toEqual(exampleUser.email);
    });

    it('should throw an error when no such user exists', async () => {
      // Act
      const actual = service.getByEmailOrThrow('invalid-email');

      // Assert
      await expect(actual).rejects.toThrow(UsersNoSuchUserException);
    });
  });

  describe('verifyCredentials()', () => {
    it('should return true if the email and password are correct', async () => {
      // Act
      const actual = await service.verifyCredentials(
        exampleUserCredentials.email,
        exampleUserCredentials.password,
      );

      // Assert
      expect(actual).toBe(true);
    });

    it('should return false if the email is nonexistent', async () => {
      // Act
      const actual = await service.verifyCredentials(
        'invalid@email.com',
        exampleUserCredentials.password,
      );

      // Assert
      expect(actual).toBe(false);
    });

    it('should return false if the password is incorrect', async () => {
      // Act
      const actual = await service.verifyCredentials(
        exampleUserCredentials.email,
        'WrongPassword',
      );

      // Assert
      expect(actual).toBe(false);
    });
  });
});
