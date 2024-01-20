import { Color } from '@prisma/client';

export const exampleCs2TeamCreateDto = {
  name: 'Team Gosho Losho',
  color: Color.BLUE,
};

export const exampleCs2Team = {
  ...exampleCs2TeamCreateDto,
  id: 1,
  capitanId: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleCs2Team2createDto = {
  name: 'Team Posho Mosho',
  color: Color.RED,
};

export const exampleCs2Team2 = {
  ...exampleCs2Team2createDto,
  id: 2,
  capitanId: 'eb11f360-98c5-44f3-9b4a-98169b051077',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleCs2NonexistentTeamCreateDto = {
  name: 'Team Nonexistent',
  color: Color.BLUE,
};

export const exampleCs2NonexistentTeam = {
  ...exampleCs2NonexistentTeamCreateDto,
  id: 3,
  capitanId: '35f8f475-f008-4c5e-88f3-5e453b6904b7',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleCs2Teams = [exampleCs2Team, exampleCs2Team2];
