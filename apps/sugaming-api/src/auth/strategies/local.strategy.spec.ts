import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';

describe('LocalStrategy', () => {
  const exampleUserInformation = {
    id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
    email: 'gosho@losho.com',
    firstName: 'Gosho',
    lastName: 'Losho',
    nickname: 'Reomak',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  jest.mock('../auth.service');
  const mockAuthService: jest.Mocked<AuthService> =
    jest.requireMock('../auth.service');

  const strategy = new LocalStrategy(mockAuthService);

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate()', () => {
    it('should return the user when the credentials are correct', async () => {
      // Arrange
      mockAuthService.validateUser = jest
        .fn()
        .mockImplementation(async () => exampleUserInformation);

      // Act
      const actual = await strategy.validate(
        'gosho@losho.com',
        'GoshoLoshoTestPassword',
      );

      // Actual
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(exampleUserInformation);
    });

    it('should throw UnauthorizedException when the credentials are incorrect', async () => {
      // Arrange
      mockAuthService.validateUser = jest
        .fn()
        .mockImplementation(async () => null);

      // Act + Assert
      await expect(
        strategy.validate('invalid@example.com', 'WrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
    });
  });
});
