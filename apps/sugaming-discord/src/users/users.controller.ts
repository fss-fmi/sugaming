import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { DiscordAccount } from '@prisma/client';
import { appConfig } from '../app/app.config';

@Controller()
export class UsersController {
  constructor(
    @InjectDiscordClient() private readonly discordClient: Client,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern('users:discord_account_linked')
  async handleDiscordAccountLinkedEvent(
    @Payload() discordAccount: DiscordAccount,
  ) {
    // Get the user
    const user = await this.usersService.getByDiscordIdOrThrow(
      discordAccount.discordId,
    );

    // Add the user to the Discord guild
    await this.usersService.joinDiscordServer(
      this.discordClient,
      user.id,
      appConfig.discord.guildId,
    );
  }
}
