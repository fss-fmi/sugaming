import { Test, TestingModule } from '@nestjs/testing';
import { Cs2TeamsController } from './cs2-teams.controller';

describe('Cs2TeamsController', () => {
  let controller: Cs2TeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Cs2TeamsController],
    }).compile();

    controller = module.get<Cs2TeamsController>(Cs2TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
