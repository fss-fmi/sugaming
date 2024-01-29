import * as process from 'process';

export const appConfig = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT || '3000', 10),
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    // password: process.env.REDIS_PASSWORD,
  },
  jwtAccessToken: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: '1h' },
  },
  jwtRefreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    expiresIn: '7d',
  },
  user: {
    password: {
      minLength: 8,
      maxLength: 50,
    },
    firstName: {
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      minLength: 2,
      maxLength: 50,
    },
    nickname: {
      minLength: 2,
      maxLength: 50,
    },
  },
  cs2Team: {
    name: {
      minLength: 3,
      maxLength: 25,
    },
    members: {
      min: 1,
      max: 5,
    },
  },
  discord: {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_API,
    scope: ['identify'],
  },
  steam: {
    apiKey: process.env.STEAM_API_KEY,
    realm: process.env.STEAM_CALLBACK_API,
    returnURL: process.env.STEAM_CALLBACK_API,
  },
};

export default appConfig;
