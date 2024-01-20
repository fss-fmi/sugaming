import createPrismaMock from 'prisma-mock';
import { exampleUsers } from '../users/users.mock';
import { exampleCs2Teams } from '../cs2/teams/cs2-teams.mock';

const prismaServiceMock = createPrismaMock({
  user: exampleUsers,
  cs2Team: exampleCs2Teams,
});

export default prismaServiceMock;
