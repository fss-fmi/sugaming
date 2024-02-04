import * as process from 'process';

export const libConfig = {
  jwtAccessToken: {
    secret: process.env['JWT_SECRET'] || 'secret',
    signOptions: { expiresIn: '1h' },
  },
  jwtRefreshToken: {
    secret: process.env['JWT_REFRESH_SECRET'] || 'refresh-secret',
    expiresIn: '7d',
  },
  user: {
    firstName: {
      minLength: 2,
      maxLength: 50,
      // Regex for cyrillic names with a first capital letter,
      // followed by lowercase letters and an optional hyphen and another name
      regex: /^[А-Я][а-я]+(?:-[А-Я][а-я]+)?$/,
    },
    lastName: {
      minLength: 2,
      maxLength: 50,
      // Regex for cyrillic names with a first capital letter,
      // followed by lowercase letters and an optional hyphen and another name
      regex: /^[А-Я][а-я]+(?:-[А-Я][а-я]+)?$/,
    },
    nickname: {
      minLength: 2,
      maxLength: 20,
      // Regex for nicknames, containing latin letters, numbers, dashes, and spaces
      regex: /^[a-zA-Z0-9\s-]+$/,
    },
    phone: {
      minLength: 10,
      maxLength: 20,
      regex:
        /^(?:\+\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,6}[-.\s]?\d{1,8}[-.\s]?\d{1,10}$/,
    },
    password: {
      minLength: 8,
      // Regex, that ensures that the password must:
      // - contain at least one uppercase letter
      // - contain at least one lowercase letter
      // - contain at least one digit
      // - contain at least one special character from the specified set
      // - be at least 8 characters long
      regex:
        /^(?=.*?[А-ЯA-Z])(?=.*?[а-яa-z])(?=.*?[0-9])(?=.*?[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]).{8,}$/,
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
    clientID: process.env['DISCORD_CLIENT_ID'],
    clientSecret: process.env['DISCORD_CLIENT_SECRET'],
    callbackURL: process.env['DISCORD_CALLBACK_URL'],
    scope: ['identify', 'guilds.join'],
    guildId: process.env['DISCORD_GUILD_ID'] || '0',
  },
  steam: {
    apiKey: process.env['STEAM_API_KEY'],
    realm: process.env['STEAM_CALLBACK_API'],
    returnURL: process.env['STEAM_CALLBACK_API'],
  },
};

export default libConfig;
