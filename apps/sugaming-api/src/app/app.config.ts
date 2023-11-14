import * as process from 'process';

export const appConfig = {
  port: parseInt(process.env.API_PORT || '3000', 10),
  jwtAccessToken: {
    secret: process.env.JWT_SECRET ?? '',
    signOptions: { expiresIn: '1h' },
  },
  jwtRefreshToken: {
    secret: process.env.JWT_REFRESH_SECRET ?? '',
    expiresIn: '7d',
  },
};

export default appConfig;
