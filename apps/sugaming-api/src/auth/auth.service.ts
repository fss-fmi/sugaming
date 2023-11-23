import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { UsersService } from '../users/users.service';
import { appConfig } from '../app/app.config';

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
    const user = await this.usersService.getByEmail(userInformation.email);
    const payload = {
      email: user.email,
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, appConfig.jwtRefreshToken),
      expiresIn: new Date().setTime(
        new Date().getTime() +
          ms(appConfig.jwtAccessToken.signOptions.expiresIn),
      ),
    };
  }
}

export default AuthService;
