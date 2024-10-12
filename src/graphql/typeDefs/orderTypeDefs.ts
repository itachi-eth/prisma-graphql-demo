// src/graphql/typeDefs/orderTypeDefs.ts
import { gql } from 'apollo-server';

export const orderTypeDefs = gql`
  type Order {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
  }

  extend type Query {
    orders: [Order!]!
  }

  extend type Mutation {
    createOrder(userId: Int!, productId: Int!, quantity: Int!): Order!
  }
`;
