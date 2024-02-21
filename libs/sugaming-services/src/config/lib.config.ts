import { UniversityDegree, UniversityYear } from '@prisma/client';
import { extname } from 'path';
import * as process from 'process';
import { diskStorage } from 'multer';

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
    universityMajor: {
      minLength: 3,
      maxLength: 50,
      // Regex for university majors, containing cyrillic letters, dashes, and spaces
      regex: /^[А-Яа-я\s-]+$/,
    },
    universityDegree: {
      minLength: 3,
      maxLength: 50,
      enum: UniversityDegree,
    },
    universityYear: {
      enum: UniversityYear,
    },
    universityFacultyNumber: {
      minLength: 5,
      maxLength: 10,
      // Regex for university faculty numbers, containing only digits and capital latin letters
      regex: /^[A-Z0-9]+$/,
    },
    universityProofImages: {
      min: 1,
      max: 5,
      storage: diskStorage({
        destination: './uploads/university-proof-images',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = extname(file.originalname);
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}-${name}${extension}`);
        },
      }),
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
