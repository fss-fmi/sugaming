import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '@sugaming/sugaming-services/users/users.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { DiscordAccount } from '@prisma/client';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { appConfig } from '../app/app.config';

@Controller()
export class UsersController {
  constructor(
    @InjectDiscordClient() private readonly discordClient: Client,
    private readonly usersService: UsersService,
    private readonly cs2TeamsService: Cs2TeamsService,
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

    // Update the user's server nickname
    await this.usersService.updateDiscordServerNickname(
      this.discordClient,
      user.id,
      appConfig.discord.guildId,
    );

    // Add the verified role to the user
    await this.usersService.addDiscordServerRoleById(
      this.discordClient,
      user.id,
      appConfig.discord.guildVerifiedRoleId,
      appConfig.discord.guildId,
    );
  }

  @MessagePattern('users:team_left')
  async handleTeamLeftEvent(discordAccount: DiscordAccount) {
    // Get the user
    const user = await this.usersService.getByDiscordIdOrThrow(
      discordAccount.discordId,
    );

    // Remove the role from the user
    await this.usersService.removeDiscordServerRoleById(
      this.discordClient,
      user.id,
      appConfig.discord.guildVerifiedRoleId,
      appConfig.discord.guildId,
    );
  }
}
