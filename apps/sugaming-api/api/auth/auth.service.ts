import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    return (await this.usersService.verifyCredentials(email, password))
      ? this.usersService.getByEmail(email)
      : null;
  }
}

export default AuthService;
