// src/graphql/resolvers/index.ts
import { userResolver } from './userResolver';
import { productResolver } from './productResolver';
import { orderResolver } from './orderResolver';

export const resolvers = [userResolver, productResolver, orderResolver];
