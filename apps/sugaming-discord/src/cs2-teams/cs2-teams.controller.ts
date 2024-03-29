import { Controller } from '@nestjs/common';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Cs2Team } from '@prisma/client';

@Controller()
export class Cs2TeamsController {
  constructor(
    @InjectDiscordClient() private readonly discordClient: Client,
    private readonly cs2TeamsService: Cs2TeamsService,
  ) {}

  @MessagePattern('cs2-teams:team-created')
  async handleTeamCreatedEvent(@Payload() createdTeam: Cs2Team) {
    // Get the first guild
    const guild = await this.discordClient.guilds.cache.first();
    // Create the team category and channels
    const category = await this.cs2TeamsService.createDiscordCategoryForCs2Team(
      guild,
      createdTeam.name,
    );

    const role = await this.cs2TeamsService.createDiscordRoleForCs2Team(
      createdTeam.name,
      guild,
      category,
    );

    await this.cs2TeamsService.createDiscordTeamChannels(
      createdTeam.name,
      guild,
      category,
    );

    await this.cs2TeamsService.assignRoleToMember(
      this.discordClient,
      createdTeam.capitanId,
      guild,
      role,
    );
  }
}
