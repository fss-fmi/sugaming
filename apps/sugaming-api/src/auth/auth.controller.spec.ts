import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@sugaming/sugaming-services/auth/auth.service';
import { exampleUserWithoutPassword } from '@sugaming/sugaming-services/users/users.mock';
import { AuthController } from './auth.controller';
import { appConfig } from '../app/app.config';

describe('AuthController', () => {
  let controller: AuthController;

  const exampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvc2hvQGxvc2hvLmNvbSIsInN1YiI6IjRiMjU5MTI0LTZjOWEtNDU0Yy1iMWViLTlhYTQ3MTYxMzZiYiIsImlhdCI6MTY5ODk3NTc1NiwiZXhwIjoxNjk5MDYyMTU2fQ.OuKRAP5ofHRn6lJ9QW5me0Iei8zhxzPAnrOKwMorypA';
  const exampleRefreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvc2hvQGxvc2hvLmNvbSIsInN1YiI6IjRiMjU5MTI0LTZjOWEtNDU0Yy1iMWViLTlhYTQ3MTYxMzZiYiIsImlhdCI6MTY5ODk3NTc1NiwiZXhwIjoxNjk5MDYyMTU2fQ.OuKRAP5ofHRn6lJ9QW5me0Iei8zhxzPAnrOKwMorypA';

  jest.mock('@sugaming/sugaming-services/auth/auth.service');
  const mockAuthService: jest.Mocked<AuthService> = jest.requireMock(
    '@sugaming/sugaming-services/auth/auth.service',
  );

  mockAuthService.login = jest.fn().mockResolvedValue({
    user: exampleUserWithoutPassword,
    accessToken: exampleToken,
    refreshToken: exampleRefreshToken,
    expiresIn: 9999999999,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register(appConfig.jwtAccessToken)],
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postLoginV1()', () => {
    it('should return access token on correct credentials', async () => {
      // Act
      const result = await controller.postLoginV1(exampleUserWithoutPassword);

      // Assert
      expect(result.user).toBe(exampleUserWithoutPassword);
      expect(result.accessToken).toBe(exampleToken);
      expect(result.refreshToken).toBe(exampleRefreshToken);
      expect(result.expiresIn).toBeTruthy();
    });
  });

  describe('postRefreshV1()', () => {
    it('should return a refreshed access token if refresh token is valid', async () => {
      // Act
      const result = await controller.postRefreshV1(exampleUserWithoutPassword);

      // Assert
      expect(result.user).toBe(exampleUserWithoutPassword);
      expect(result.accessToken).toBe(exampleToken);
      expect(result.refreshToken).toBe(exampleRefreshToken);
      expect(result.expiresIn).toBeTruthy();
    });
  });
});
