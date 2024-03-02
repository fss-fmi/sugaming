import { UniversityDegree, UniversityYear } from '@prisma/client';
import * as process from 'process';

const universities = [
  'Софийски университет "Св. Климент Охридски"',
  'Аграрен университет',
  'Академия за музикално, танцово и изобразително изкуство',
  'Академия на МВР',
  'Американски университет в България',
  'Бургаски свободен университет',
  'Варненски свободен университет "Черноризец Храбър"',
  'Великотърновски университет "Свети свети Кирил и Методий"',
  'Висше военноморско училище "Никола Вапцаров"',
  'Висше строително училище "Любен Каравелов"',
  'Висше транспортно училище "Тодор Каблешков"',
  'Висше училище по агробизнес и развитие на регионите',
  'Висше училище по застраховане и финанси',
  'Висше училище по мениджмънт',
  'Висше училище по сигурност и икономика',
  'Висше училище по телекомуникации и пощи',
  'Военна академия "Георги Раковски"',
  'Европейски политехнически университет',
  'Европейско висше училище по икономика и мениджмънт',
  'Икономически университет',
  'Колеж по мениджмънт, търговия и маркетинг',
  'Лесотехнически университет',
  'Медицински университет, Плевен',
  'Медицински университет, Пловдив',
  'Медицински университет, София',
  'Медицински университет "Професор доктор Параскев Стоянов", Варна',
  'Международно висше бизнес училище',
  'Минно-геоложки университет "Свети Иван Рилски"',
  'Национален военен университет "Васил Левски"',
  'Национална академия за театрално и филмово изкуство "Кръстьо Сарафов"',
  'Национална музикална академия "Професор Панчо Владигеров"',
  'Национална спортна академия "Васил Левски"',
  'Национална художествена академия',
  'Нов български университет',
  'Пловдивски университет "Паисий Хилендарски"',
  'Русенски университет "Ангел Кънчев"',
  'Стопанска академия "Димитър Ценов"',
  'Театрален колеж "Любен Гройс"',
  'Технически университет, Варна',
  'Технически университет, Габрово',
  'Технически университет, София',
  'Тракийски университет',
  'Университет "Проф. д-р Асен Златаров"',
  'Университет за национално и световно стопанство',
  'Университет по архитектура, строителство и геодезия',
  'Университет по библиотекознание и информационни технологии',
  'Университет по хранителни технологии',
  'Химикотехнологичен и металургичен университет',
  'Шуменски университет "Епископ Константин Преславски"',
  'Югозападен университет "Неофит Рилски"',
];

export const libConfig = {
  apiBase: process.env['API_BASE'] || 'http://localhost:3000',
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
      maxLength: 40,
      // Regex for cyrillic names with a first capital letter,
      // followed by lowercase letters and an optional hyphen and another name
      regex: /^[А-Я][а-я]+(?:-[А-Я][а-я]+)?$/,
    },
    lastName: {
      minLength: 2,
      maxLength: 40,
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
    university: {
      enum: universities,
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
    },
  },
  cs2Team: {
    name: {
      minLength: 3,
      maxLength: 25,
    },
    members: {
      min: 5,
      max: 5,
      sofiaUniversityThreshold: 3,
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
