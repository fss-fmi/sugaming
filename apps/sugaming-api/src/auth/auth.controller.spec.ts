import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { appConfig } from '../app/app.config';
import { exampleUserWithoutPassword } from '../users/users.mock';

describe('AuthController', () => {
  let controller: AuthController;

  const exampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvc2hvQGxvc2hvLmNvbSIsInN1YiI6IjRiMjU5MTI0LTZjOWEtNDU0Yy1iMWViLTlhYTQ3MTYxMzZiYiIsImlhdCI6MTY5ODk3NTc1NiwiZXhwIjoxNjk5MDYyMTU2fQ.OuKRAP5ofHRn6lJ9QW5me0Iei8zhxzPAnrOKwMorypA';

  jest.mock('./auth.service');
  const mockAuthService: jest.Mocked<AuthService> =
    jest.requireMock('./auth.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule.register(appConfig.jwt)],
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

  describe('login()', () => {
    it('should return access token on correct credentials', async () => {
      // Arrange
      mockAuthService.login = jest
        .fn()
        .mockResolvedValue({ accessToken: exampleToken });

      // Act
      const result = await controller.post(exampleUserWithoutPassword);

      // Assert
      expect(result.accessToken).toBe(exampleToken);
    });
  });
});
