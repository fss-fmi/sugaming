import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { isJWT } from 'class-validator';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { exampleUser, exampleUserWithoutPassword } from '../users/users.mock';
import { libConfig } from '../config/lib.config';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUsersService = {
    verifyCredentials: jest.fn(),
    getByEmail: jest.fn().mockReturnValue(exampleUserWithoutPassword),
    getByEmailOrThrow: jest.fn().mockReturnValue(exampleUserWithoutPassword),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register(libConfig.jwtAccessToken)],
      providers: [AuthService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should return user information if the credentials are correct', async () => {
      // Arrange
      mockUsersService.verifyCredentials.mockReturnValue(true);

      // Act
      const result = await service.validateUser(
        'gosho@losho.com',
        'GoshoLoshoTestPassword',
      );

      // Assert
      expect(result).toBeTruthy();
      expect(result).toEqual(exampleUserWithoutPassword);
    });

    it('should return null if the credentials are incorrect', async () => {
      // Arrange
      mockUsersService.verifyCredentials.mockReturnValue(false);

      // Act
      const result = await service.validateUser(
        'invalid@email.com',
        'InvalidPass',
      );

      // Assert
      expect(result).toBe(null);
    });
  });

  describe('login()', () => {
    it('should create a valid JWT token with the user email and id', async () => {
      // Act
      const actual = await service.login(exampleUserWithoutPassword);

      // Assert
      // User validation
      expect(actual.user).toBe(exampleUserWithoutPassword);

      // Access token validation
      expect(isJWT(actual.accessToken)).toBe(true);
      expect(() => jwtService.verify(actual.accessToken)).not.toThrow();

      const accessTokenInformation = jwtService.verify(actual.accessToken);
      expect(accessTokenInformation.email).toBe(exampleUser.email);
      expect(accessTokenInformation.sub).toBe(exampleUser.id);

      expect(isJWT(actual.refreshToken)).toBe(true);
      expect(() =>
        jwtService.verify(actual.refreshToken, libConfig.jwtRefreshToken),
      ).not.toThrow();

      // Refresh token assert
      const refreshTokenInformation = jwtService.verify(
        actual.refreshToken,
        libConfig.jwtRefreshToken,
      );
      expect(refreshTokenInformation.email).toBe(exampleUser.email);
      expect(refreshTokenInformation.sub).toBe(exampleUser.id);

      // Expires in assert
      expect(refreshTokenInformation).toBeTruthy();
    });
  });
});
