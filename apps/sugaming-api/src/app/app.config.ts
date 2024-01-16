import * as process from 'process';

export const appConfig = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT || '3000', 10),
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
};

export default appConfig;
