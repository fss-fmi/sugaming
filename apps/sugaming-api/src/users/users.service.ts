import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCannotInviteSelfException } from './exceptions/users-cannot-invite-self.exception';
import { UsersNotMemberOfCs2TeamException } from './exceptions/users-not-member-of-cs2-team.exception';
import { UsersOnlyCaptainCanInviteException } from './exceptions/users-only-captain-can-invite.exception';
import { UsersNoSuchUserException } from './exceptions/users-no-such-user.exception';
import { UsersAlreadyInvitedToTeamException } from './exceptions/users-already-invited-to-team.exception';

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

  async getByEmailOrThrow(email: string) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new UsersNoSuchUserException();
    }

    return user;
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

  async createCs2TeamInvitation(
    inviter: Omit<Users, 'passwordHash'>,
    inviteeId: string,
  ) {
    // Check if the inviter is the same as the invitee
    if (inviter.id === inviteeId) {
      throw new UsersCannotInviteSelfException();
    }

    // Check if the inviter is a member of a CS2 team
    const inviterTeam = await this.prisma.cs2Teams.findFirst({
      where: {
        members: { some: { id: inviter.id } },
      },
    });

    if (!inviterTeam) {
      throw new UsersNotMemberOfCs2TeamException();
    }

    // Check if the inviter is the captain of the CS2 team
    if (inviterTeam.capitanId !== inviter.id) {
      throw new UsersOnlyCaptainCanInviteException();
    }

    // Check if the invitee exists
    const invitee = await this.prisma.users.findUnique({
      where: {
        id: inviteeId,
      },
    });

    if (!invitee) {
      throw new UsersNoSuchUserException();
    }

    // Check if the invitee is already invited to the CS2 team
    const existingInvitation = await this.prisma.cs2TeamInvitation.findFirst({
      where: {
        userId: invitee.id,
      },
    });
    if (existingInvitation) {
      throw new UsersAlreadyInvitedToTeamException();
    }

    // Create the invitation
    return this.prisma.cs2TeamInvitation.create({
      data: {
        teamId: inviterTeam.id,
        userId: invitee.id,
      },
    });
  }
}

export default UsersService;
