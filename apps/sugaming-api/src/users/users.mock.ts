export const exampleUserWithoutPassword = {
  id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
  email: 'gosho@losho.com',
  firstName: 'Gosho',
  lastName: 'Losho',
  nickname: 'Reomak',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials = {
  email: 'gosho@losho.com',
  password: 'GoshoLoshoTestPassword',
};

export const exampleUser = {
  // Hashed and salted version of "GoshoLoshoTestPassword"
  passwordHash: '$2b$10$ieK.GfGsIiCJXdmsxbTmzutpPmekEQQsy9xhoS6iNggqv/q68IgKq',
  ...exampleUserWithoutPassword,
};

export const exampleUserWithoutPassword2 = {
  id: 'eb11f360-98c5-44f3-9b4a-98169b051077',
  email: 'posho.minava.moshava@gmail.com',
  passwordHash: 'hashedPassword',
  firstName: 'Posho',
  lastName: 'Mosho',
  nickname: 'poshto moshavam',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials2 = {
  email: 'posho.minava.moshava@gmail.com',
  password: 'GoshoLoshoTestPassword',
};

export const exampleUser2 = {
  // Hashed and salted version of "GoshoLoshoTestPassword"
  passwordHash: '$2b$10$ieK.GfGsIiCJXdmsxbTmzutpPmekEQQsy9xhoS6iNggqv/q68IgKq',
  ...exampleUserWithoutPassword,
};

export const exampleUsers = [exampleUser, exampleUser2];

export const exampleUsersWithoutPasswords = [
  exampleUserWithoutPassword,
  exampleUserWithoutPassword2,
];
