import { Test, TestingModule } from '@nestjs/testing';
import { I18nContext } from 'nestjs-i18n';
import { Cs2TeamsService } from './cs2-teams.service';
import { PrismaService } from '../../prisma/prisma.service';
import prismaServiceMock from '../../prisma/prisma.service.mock';
import {
  exampleCs2NonexistentTeam,
  exampleCs2NonexistentTeamCreateDto,
  exampleCs2TeamCreateDto,
} from './cs2-teams.mock';
import { exampleUser, exampleUser3 } from '../../users/users.mock';
import { Cs2TeamsNameAlreadyExistsException } from './exceptions/cs2-teams-name-already-exists.exception';
import { UsersService } from '../../users/users.service';
import { getRedisToken } from '@songkeys/nestjs-redis';

describe('Cs2TeamsService', () => {
  let service: Cs2TeamsService;

  jest.mock('nestjs-i18n');
  I18nContext.current = jest.fn().mockReturnValue({
    t: () => jest.fn(),
  });

  const redisServiceMock = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRedisToken('default'), useValue: redisServiceMock },
        Cs2TeamsService,
        PrismaService,
        UsersService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    service = module.get<Cs2TeamsService>(Cs2TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new team on valid information', async () => {
      // Act
      const actual = await service.create(
        exampleCs2NonexistentTeamCreateDto,
        exampleUser3.id,
      );

      // Assert
      expect(actual).not.toBeNull();

      // Should be equal (except for timestamps)
      const { createdAt, updatedAt, ...expected } = exampleCs2NonexistentTeam;
      const {
        createdAt: actualCreatedAt,
        updatedAt: actualUpdatedAt,
        ...actualTeam
      } = actual;

      expect(actualTeam).toEqual(expected);
      expect(redisServiceMock.publish).toHaveBeenCalled();
    });

    it('should throw an BadRequestException when the team name is already taken', async () => {
      // Act + Assert
      await expect(
        service.create(exampleCs2TeamCreateDto, exampleUser3.id),
      ).rejects.toThrow(Cs2TeamsNameAlreadyExistsException);
    });

    it('should throw an BadRequestException when the user is already in a team', async () => {
      // Act + Assert
      await expect(
        service.create(exampleCs2NonexistentTeamCreateDto, exampleUser.id),
      ).rejects.toThrow(Cs2TeamsNameAlreadyExistsException);
    });
  });
});
