import * as process from 'process';

export const appConfig = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT || '3000', 10),
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    password: process.env.REDIS_PASSWORD,
  },
  multer: {
    dest: process.env.MULTER_DEST || 'uploads',
  },
  jwtAccessToken: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: '1h' },
  },
  jwtRefreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    expiresIn: '7d',
  },
};

export default appConfig;
