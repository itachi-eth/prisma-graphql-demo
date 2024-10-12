// src/graphql/typeDefs/productTypeDefs.ts
import { gql } from 'apollo-server';

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    inventory: Int!
    orders: [Order!]!
  }

  extend type Query {
    products: [Product!]!
  }

  extend type Mutation {
    createProduct(name: String!, price: Float!, inventory: Int!): Product!
  }
`;
