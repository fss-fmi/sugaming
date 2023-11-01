import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';
import {
  exampleUserCredentials,
  exampleUserWithoutPassword,
} from '../../users/users.mock';

describe('LocalStrategy', () => {
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
      ).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
    });
  });
});
