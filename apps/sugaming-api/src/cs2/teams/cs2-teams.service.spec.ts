import { Test, TestingModule } from '@nestjs/testing';
import { Cs2TeamsService } from './cs2-teams.service';

describe('Cs2TeamsService', () => {
  let service: Cs2TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cs2TeamsService],
    }).compile();

    service = module.get<Cs2TeamsService>(Cs2TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
