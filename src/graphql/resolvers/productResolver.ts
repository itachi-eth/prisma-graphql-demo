// src/graphql/resolvers/productResolver.ts
import { Product } from '@prisma/client';
import {
  getAllProducts,
  createProduct,
  getProductOrders,
} from '../../modules/product/productService';

export const productResolver = {
  Query: {
    products: async (): Promise<Product[]> => {
      return getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      args: { name: string; price: number; inventory: number },
    ): Promise<Product> => {
      return createProduct(args.name, args.price, args.inventory);
    },
  },
  Product: {
    orders: async (parent: Product) => {
      return getProductOrders(parent.id);
    },
  },
};
