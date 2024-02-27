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
    const category = await this.cs2TeamsService.createCategoryForCs2Team(
      guild,
      createdTeam.name,
    );

    await this.cs2TeamsService.createRoleForCs2Team(
      createdTeam.name,
      guild,
      category,
    );

    await this.cs2TeamsService.createTeamChannels(
      createdTeam.name,
      guild,
      category,
    );
  }
}
