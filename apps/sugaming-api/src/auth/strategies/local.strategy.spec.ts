import { I18nContext } from 'nestjs-i18n';
import { LocalStrategy } from './local.strategy';
import {
  exampleUserCredentials,
  exampleUserWithoutPassword,
} from '../../users/users.mock';
import { AuthUnauthorizedException } from '../exceptions/auth-unauthorized.exception';

describe('LocalStrategy', () => {
  jest.mock('nestjs-i18n');
  I18nContext.current = jest.fn().mockReturnValue({
    t: () => jest.fn().mockReturnValue(''),
  });

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  const strategy = new LocalStrategy(mockAuthService as never);

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate()', () => {
    it('should return the user when the credentials are correct', async () => {
      // Arrange
      mockAuthService.validateUser = jest
        .fn()
        .mockImplementation(async () => exampleUserWithoutPassword);

      // Act
      const actual = await strategy.validate(
        exampleUserCredentials.email,
        exampleUserCredentials.password,
      );

      // Actual
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(exampleUserWithoutPassword);
    });

    it('should throw UnauthorizedException when the credentials are incorrect', async () => {
      // Arrange
      mockAuthService.validateUser = jest
        .fn()
        .mockImplementation(async () => null);

      // Act + Assert
      await expect(
        strategy.validate('invalid@example.com', 'WrongPassword'),
      ).rejects.toThrow(AuthUnauthorizedException);
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
    });
  });
});
