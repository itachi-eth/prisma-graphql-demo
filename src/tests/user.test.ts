// tests/user.test.ts
import prisma from './__mocks__/prismaClient';
import { getAllUsers, createUser } from '../modules/user/userService';

jest.mock('../config/prismaClient', () => prisma);

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await getAllUsers();

    expect(users).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a new user', async () => {
    const newUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    prisma.user.findUnique.mockResolvedValue(null); // No existing user
    prisma.user.create.mockResolvedValue(newUser);

    const createdUser = await createUser('John Doe', 'john.doe@example.com');

    expect(createdUser).toEqual(newUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'john.doe@example.com' },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: 'John Doe', email: 'john.doe@example.com' },
    });
  });

  it('should throw an error if user already exists', async () => {
    const existingUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    prisma.user.findUnique.mockResolvedValue(existingUser);

    await expect(
      createUser('John Doe', 'john.doe@example.com'),
    ).rejects.toThrow('User already exists');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'john.doe@example.com' },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
