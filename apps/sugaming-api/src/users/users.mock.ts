export const exampleUserWithoutPassword = {
  id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
  email: 'gosho@losho.com',
  firstName: 'Gosho',
  lastName: 'Losho',
  nickname: 'Reomak',
  cs2TeamId: 1,
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
  firstName: 'Posho',
  lastName: 'Mosho',
  nickname: 'poshto moshavam',
  cs2TeamId: 2,
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
  ...exampleUserWithoutPassword2,
};

export const exampleUserWithoutPassword3 = {
  id: '35f8f475-f008-4c5e-88f3-5e453b6904b7',
  email: 'posho.mosho@gmail.com',
  firstName: 'Posho',
  lastName: 'Mosho',
  nickname: 'poshomosho',
  cs2TeamId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials3 = {
  email: 'posho.mosho@gmail.com',
  password: 'GoshoLoshoTestPassword',
};

export const exampleUser3 = {
  // Hashed and salted version of "GoshoLoshoTestPassword"
  passwordHash: '$2b$10$ieK.GfGsIiCJXdmsxbTmzutpPmekEQQsy9xhoS6iNggqv/q68IgKq',
  ...exampleUserWithoutPassword3,
};

export const exampleUsers = [exampleUser, exampleUser2, exampleUser3];
