import { UniversityDegree, UniversityYear } from '@prisma/client';

export const exampleUserWithoutPassword = {
  id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
  firstName: 'Gosho',
  lastName: 'Losho',
  nickname: 'Reomak',
  email: 'gosho@losho.com',
  phone: '0888008135',
  universityMajor: 'Компютърни науки',
  universityDegree: UniversityDegree.BACHELOR,
  universityYear: UniversityYear.THIRD,
  universityFacultyNumber: '0MI123456',
  cs2TeamId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials = {
  email: 'gosho@losho.com',
  password: 'ExamplePassword@123!@#',
};

export const exampleUser = {
  // Hashed and salted version of "ExamplePassword@123!@#'
  passwordHash: '$2a$10$HM3RWCp.UPo0Zi73fyrDvu0ZIPEV1TxWRpVzCIe2F1Bn79GN7UiOm',
  ...exampleUserWithoutPassword,
};

export const exampleUserWithoutPassword2 = {
  id: 'eb11f360-98c5-44f3-9b4a-98169b051077',
  firstName: 'Posho',
  lastName: 'Mosho',
  nickname: 'poshto moshavam',
  email: 'posho.minava.moshava@gmail.com',
  phone: '0888008136',
  universityMajor: 'Информатика',
  universityDegree: UniversityDegree.BACHELOR,
  universityYear: UniversityYear.FIRST,
  universityFacultyNumber: '0MI123457',
  cs2TeamId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials2 = {
  email: 'posho.minava.moshava@gmail.com',
  password: 'ExamplePassword@123!@#',
};

export const exampleUser2 = {
  // Hashed and salted version of "GoshoLoshoTestPassword"
  passwordHash: '$2a$10$HM3RWCp.UPo0Zi73fyrDvu0ZIPEV1TxWRpVzCIe2F1Bn79GN7UiOm',
  ...exampleUserWithoutPassword2,
};

export const exampleUserWithoutPassword3 = {
  id: '35f8f475-f008-4c5e-88f3-5e453b6904b7',
  firstName: 'Posho',
  lastName: 'Mosho',
  nickname: 'poshomosho',
  email: 'posho.mosho@gmail.com',
  phone: '0888008137',
  universityMajor: 'Софтуерно инженерство',
  universityDegree: UniversityDegree.BACHELOR,
  universityYear: UniversityYear.FIRST,
  universityFacultyNumber: '0MI123458',
  cs2TeamId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleUserCredentials3 = {
  email: 'posho.mosho@gmail.com',
  password: 'ExamplePassword@123!@#',
};

export const exampleUser3 = {
  // Hashed and salted version of "ExamplePassword@123!@#"
  passwordHash: '$2a$10$HM3RWCp.UPo0Zi73fyrDvu0ZIPEV1TxWRpVzCIe2F1Bn79GN7UiOm',
  ...exampleUserWithoutPassword3,
};

export const exampleUsers = [exampleUser, exampleUser2, exampleUser3];
