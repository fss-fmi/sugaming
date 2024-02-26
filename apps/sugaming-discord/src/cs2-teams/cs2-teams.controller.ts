import { Controller } from '@nestjs/common';
import { Cs2TeamsService } from '@sugaming/sugaming-services/cs2/teams/cs2-teams.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, ChannelType, Guild } from 'discord.js';
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
    const category = await this.createTeamChannels(createdTeam.name, guild);

    // Create a role for the team
    const newRole = await guild.roles.create({
      name: `🐔 Отбор ${createdTeam.name} 🐔`,
      color: 'Orange',
    });

    // Find the @everyone role
    const everyone = guild.roles.cache.find(
      (role) => role.name === '@everyone',
    );

    // Set for @everyone role to not be able to view the category
    await category.permissionOverwrites.create(everyone, {
      ViewChannel: false,
    });

    // Set the new role to be able to view the category
    await category.permissionOverwrites.create(newRole, {
      ViewChannel: true,
    });
  }

  async createTeamChannels(name: string, guild: Guild) {
    // Create a category for the team
    const category = await guild.channels.create({
      name: `🐔 Отбор ${name} 🐔`,
      type: ChannelType.GuildCategory,
    });

    // Create a text channel for the team
    const textChannel = await guild.channels.create({
      name: `💬︱Отбор-${name}`,
      type: ChannelType.GuildText,
      parent: category,
    });

    // Send a welcome message to the text channel
    await textChannel.send(
      `Welcome to the ${name} team! Please make sure to read the rules and have fun!`,
    );

    // Create a voice channel for the team
    await guild.channels.create({
      name: `🔊︱Отбор-${name}`,
      type: ChannelType.GuildVoice,
      parent: category,
    });

    return category;
  }
}
