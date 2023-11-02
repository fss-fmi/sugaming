import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { UsersService } from '../users/users.service';

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

  async login(user: Omit<Users, 'passwordHash'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

export default AuthService;
