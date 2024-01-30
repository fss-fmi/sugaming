import { GatewayIntentBits, Partials } from 'discord.js';
import * as process from 'process';

export const appConfig = {
  production: process.env.NODE_ENV === 'production',
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    discordClientOptions: {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    },
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.User,
      Partials.GuildMember,
    ],
    guildId: process.env.DISCORD_GUILD_ID,
    guildVerifiedRoleId: process.env.DISCORD_GUILD_VERTIFIED_ROLE_ID,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    // password: process.env.REDIS_PASSWORD,
  },
};

export default appConfig;
