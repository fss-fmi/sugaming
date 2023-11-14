export const appConfig = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    signOptions: { expiresIn: '1h' },
    refreshSigningOptions: { expiresIn: '7d' },
  },
};

export default appConfig;
