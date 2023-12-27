import { Test, TestingModule } from '@nestjs/testing';
import { Cs2TeamsController } from './cs2-teams.controller';
import { Cs2TeamsService } from './cs2-teams.service';
import { exampleUserWithoutPassword3 } from '../../users/users.mock';
import {
  exampleCs2NonexistentTeam,
  exampleCs2NonexistentTeamCreateDto,
} from './cs2-teams.mock';

describe('Cs2TeamsController', () => {
  let controller: Cs2TeamsController;

  jest.mock('./cs2-teams.service');
  const mockCs2TeamsService: jest.Mocked<Cs2TeamsService> = jest.requireMock(
    './cs2-teams.service',
  );

  mockCs2TeamsService.create = jest
    .fn()
    .mockResolvedValue(exampleCs2NonexistentTeam);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cs2TeamsService],
      controllers: [Cs2TeamsController],
    })
      .overrideProvider(Cs2TeamsService)
      .useValue(mockCs2TeamsService)
      .compile();

    controller = module.get<Cs2TeamsController>(Cs2TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postV1', () => {
    it('should return a new CS2 team on correct information', async () => {
      // Act
      const result = await controller.postV1(
        exampleCs2NonexistentTeamCreateDto,
        exampleUserWithoutPassword3,
      );

      // Assert
      expect(result).toBe(exampleCs2NonexistentTeam);
    });
  });
});
