// src/graphql/resolvers/userResolver.ts
import { User, Order } from '@prisma/client';
import {
  getAllUsers,
  createUser,
  getUserOrders,
} from '../../modules/user/userService';

export const userResolver = {
  Query: {
    users: async (): Promise<User[]> => {
      return getAllUsers();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { name: string; email: string },
    ): Promise<User> => {
      return createUser(args.name, args.email);
    },
  },
  User: {
    orders: async (parent: User) => {
      return getUserOrders(parent.id);
    },
  },
};
