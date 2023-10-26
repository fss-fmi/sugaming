import createPrismaMock from 'prisma-mock';

const prismaServiceMock = createPrismaMock({
  users: [
    {
      id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
      email: 'gosho@losho.com',
      // Hashed and salted version of "GoshoLoshoTestPassword"
      passwordHash:
        '$2b$10$ieK.GfGsIiCJXdmsxbTmzutpPmekEQQsy9xhoS6iNggqv/q68IgKq',
      firstName: 'Gosho',
      lastName: 'Losho',
      nickname: 'Reomak',
    },
    {
      id: 'eb11f360-98c5-44f3-9b4a-98169b051077',
      email: 'posho.minava.moshava@gmail.com',
      passwordHash: 'hashedPassword',
      firstName: 'Posho',
      lastName: 'Mosho',
      nickname: 'poshto moshavam',
    },
  ],
});

export default prismaServiceMock;
