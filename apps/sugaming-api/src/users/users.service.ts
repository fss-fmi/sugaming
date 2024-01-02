import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    // Get user information from the database
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    // Return null if the user does not exist
    if (!user) {
      return null;
    }

    // Remove the password hash and return the user
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getByIdOrThrow(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new UsersNoSuchUserException();
    }

    return user;
  }

  async getByEmail(email: string) {
    // Get user information from the database
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    // Return null if the user does not exist
    if (!user) {
      return null;
    }

    // Remove the password hash and return the user
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async verifyCredentials(email: string, password: string) {
    // Get user information from the database
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    // Validate that the user exists and that the passwords are matching
    return user != null && (await bcrypt.compare(password, user.passwordHash));
  }
}

export default UsersService;
