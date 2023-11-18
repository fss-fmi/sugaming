import createPrismaMock from 'prisma-mock';
import { exampleUsers } from '../users/users.mock';

const prismaServiceMock = createPrismaMock({
  users: exampleUsers,
});

export default prismaServiceMock;
