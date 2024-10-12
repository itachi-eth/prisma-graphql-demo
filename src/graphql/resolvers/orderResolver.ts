// src/graphql/resolvers/orderResolver.ts
import { Order } from '@prisma/client';
import {
  getAllOrders,
  createOrder,
  getOrderUser,
  getOrderProduct,
} from '../../modules/order/orderService';

export const orderResolver = {
  Query: {
    orders: async (): Promise<Order[]> => {
      return getAllOrders();
    },
  },
  Mutation: {
    createOrder: async (
      _: any,
      args: { userId: number; productId: number; quantity: number },
    ): Promise<Order> => {
      return createOrder(args.userId, args.productId, args.quantity);
    },
  },
  Order: {
    user: async (parent: Order) => {
      return getOrderUser(parent.userId);
    },
    product: async (parent: Order) => {
      return getOrderProduct(parent.productId);
    },
  },
};
