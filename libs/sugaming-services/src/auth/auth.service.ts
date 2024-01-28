import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { UsersService } from '../users/users.service';
import { libConfig } from '../config/lib.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return (await this.usersService.verifyCredentials(email, password))
      ? this.usersService.getByEmail(email)
      : null;
  }

  async login(userInformation: { email: string }) {
    const user = await this.usersService.getByEmailOrThrow(
      userInformation.email,
    );
    const payload = {
      email: user.email,
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, libConfig.jwtRefreshToken),
      expiresIn: new Date().setTime(
        new Date().getTime() +
          ms(libConfig.jwtAccessToken.signOptions.expiresIn),
      ),
    };
  }
}

export default AuthService;
