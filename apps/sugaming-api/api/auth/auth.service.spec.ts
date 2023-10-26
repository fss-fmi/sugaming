import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const exampleUserInformation = {
    id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
    email: 'gosho@losho.com',
  };

  const usersServiceMock = {
    verifyCredentials: jest.fn(),
    getByEmail: jest.fn().mockReturnValue(exampleUserInformation),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should return user information if the credentials are correct', async () => {
      // Arrange
      usersServiceMock.verifyCredentials.mockReturnValue(true);

      // Act
      const result = await service.validateUser(
        'gosho@losho.com',
        'GoshoLoshoTestPassword',
      );

      // Assert
      expect(result).toBeTruthy();
      expect(result).toEqual(exampleUserInformation);
    });

    it('should return null if the credentials are incorrect', async () => {
      // Arrange
      usersServiceMock.verifyCredentials.mockReturnValue(false);

      // Act
      const result = await service.validateUser(
        'invalid@email.com',
        'InvalidPass',
      );

      // Assert
      expect(result).toBe(null);
    });
  });
});
