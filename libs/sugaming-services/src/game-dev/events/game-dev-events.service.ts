import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GameDevEventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getByName(name: string) {
    return this.prisma.gameDevEvent.findFirst({
      where: {
        name: {
          equals: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
      },
    });
  }

  async getByNameOrThrow(name: string) {
    const event = await this.getByName(name);
    if (!event) {
      throw new Error('Event not found'); // TODO: Create custom exception
    }
    return event;
  }

  async joinEvent(eventName: string, userId: string) {
    // Check if the user exists
    await this.usersService.getByIdOrThrow(userId);

    // Check if the event exists
    const event = await this.getByNameOrThrow(eventName);

    // Check if the user is already in the event
    const userEvent = await this.prisma.gameDevEventParticipant.findFirst({
      where: {
        userId,
        eventId: event.id,
      },
    });

    if (userEvent) {
      throw new Error('User is already in the event'); // TODO: Create custom exception
    }

    // Add the user to the event
    await this.prisma.gameDevEventParticipant.create({
      data: {
        userId,
        eventId: event.id,
      },
    });
  }
}
