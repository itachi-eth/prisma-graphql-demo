// src/graphql/typeDefs/userTypeDefs.ts
import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
  }

  extend type Query {
    users: [User!]!
  }

  extend type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
