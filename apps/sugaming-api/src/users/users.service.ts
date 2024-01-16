import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nContext } from 'nestjs-i18n';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCannotInviteSelfException } from './exceptions/users-cannot-invite-self.exception';
import { UsersNotMemberOfCs2TeamException } from './exceptions/users-not-member-of-cs2-team.exception';
import { UsersOnlyCaptainCanInviteException } from './exceptions/users-only-captain-can-invite.exception';
import { UsersNoSuchUserException } from './exceptions/users-no-such-user.exception';
import { UsersInviteAlreadyPendingException } from './exceptions/users-invite-already-pending.exception';
import { UsersNoSuchTeamException } from './exceptions/users-no-such-team.exception';
import { UsersNoSuchInviteException } from './exceptions/users-no-such-invite.exception';
import { UsersAlreadyInTeamException } from './exceptions/users-already-in-team.exception';
import { UsersNotInviteeOfInviteException } from './exceptions/users-not-invitee-of-invite.exception';
import { UsersEmailAlreadyInUseException } from './exceptions/users-email-already-in-use.exception';
import { UsersNicknameAlreadyInUseException } from './exceptions/users-nickname-already-in-use.exception';
import { UsersTeamIsFullException } from './exceptions/users-team-is-full.exception';
import { appConfig } from '../app/app.config';
import { UserRequestBodyDto } from './dto/user-request-body.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    // Get user information from the database
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Validate that the user exists and that the passwords are matching
    return user != null && (await bcrypt.compare(password, user.passwordHash));
  }

  async getUserCs2TeamInvites(user: Omit<User, 'passwordHash'>) {
    // Validate that the user exists
    await this.getByIdOrThrow(user.id);

    // Get all the team invitations for the user
    return this.prisma.cs2TeamInvitation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            capitanId: true,
            members: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  async createCs2TeamInvitation(
    inviter: Omit<User, 'passwordHash'>,
    inviteeId: string,
  ) {
    // Check if the inviter is the same as the invitee
    if (inviter.id === inviteeId) {
      throw new UsersCannotInviteSelfException();
    }

    // Check if the inviter is a member of a CS2 team
    const inviterTeam = await this.prisma.cs2Team.findFirst({
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
    const invitee = await this.prisma.user.findUnique({
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
      throw new UsersInviteAlreadyPendingException();
    }

    // Create the invitation
    return this.prisma.cs2TeamInvitation.create({
      data: {
        teamId: inviterTeam.id,
        userId: invitee.id,
      },
    });
  }

  async respondToCs2TeamInvite(
    response: 'ACCEPT' | 'DECLINE',
    inviteId: number,
    user: Omit<User, 'passwordHash'>,
  ) {
    // Validate that the user exists
    await this.getByIdOrThrow(user.id);

    // Validate that the invite exists
    const invite = await this.prisma.cs2TeamInvitation.findUnique({
      where: {
        id: inviteId,
      },
    });

    if (!invite) {
      throw new UsersNoSuchInviteException();
    }

    // Validate that the team exists
    const team = await this.prisma.cs2Team.findUnique({
      where: {
        id: invite.teamId,
      },
      include: {
        members: true,
      },
    });

    if (!team) {
      throw new UsersNoSuchTeamException();
    }

    // Validate that the user is the invitee of the invite
    if (invite.userId !== user.id) {
      throw new UsersNotInviteeOfInviteException();
    }

    // On accept, validate that the user is not already part of a team
    const existingTeam = await this.prisma.cs2Team.findFirst({
      where: {
        members: { some: { id: user.id } },
      },
    });

    if (existingTeam && response === 'ACCEPT') {
      throw new UsersAlreadyInTeamException();
    }

    // Delete the invitation
    await this.prisma.cs2TeamInvitation.delete({
      where: {
        id: inviteId,
      },
    });

    // On decline, return early
    const i18n = I18nContext.current();
    if (response === 'DECLINE') {
      return { message: i18n.t('responses.users.cs2TeamInviteDeclined') };
    }

    // Validate that the team is not full
    if (team.members.length >= appConfig.cs2Team.members.max) {
      throw new UsersTeamIsFullException();
    }

    // Add the user to the team
    await this.prisma.cs2Team.update({
      where: {
        id: team.id,
      },
      data: {
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return { message: i18n.t('responses.users.cs2TeamInviteAccepted') };
  }

  async registerUser(userToBeCreated: UserRequestBodyDto) {
    // Check if the email is already in use
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userToBeCreated.email },
    });

    if (existingUser) {
      throw new UsersEmailAlreadyInUseException();
    }

    // Check if nickname is already in use
    const existingNickname = await this.prisma.user.findUnique({
      where: { nickname: userToBeCreated.nickname },
    });

    if (existingNickname) {
      throw new UsersNicknameAlreadyInUseException();
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(userToBeCreated.password, 10);

    // Create the user
    const { password, ...userToBeCreatedWithoutPassword } = userToBeCreated;
    const newUser = await this.prisma.user.create({
      data: {
        passwordHash: hashedPassword,
        ...userToBeCreatedWithoutPassword,
      },
    });

    // Remove the password hash and return the user
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}

export default UsersService;
