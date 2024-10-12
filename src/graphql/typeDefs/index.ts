// src/graphql/typeDefs/index.ts
import { gql } from 'apollo-server';
import { userTypeDefs } from './userTypeDefs';
import { productTypeDefs } from './productTypeDefs';
import { orderTypeDefs } from './orderTypeDefs';

export const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${userTypeDefs}
  ${productTypeDefs}
  ${orderTypeDefs}
`;
