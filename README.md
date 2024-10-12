# Prisma + GraphQL Demo

This project demonstrates the integration of Prisma ORM with GraphQL in a Node.js environment, showcasing a product order management system.

## Features

- GraphQL API for product and order management
- Prisma ORM for database operations
- Product inventory tracking
- Order creation and management

## Tech Stack

- Node.js
- TypeScript
- Apollo Server (GraphQL)
- Prisma ORM
- PostgreSQL (or your preferred database)

## Prerequisites

- Node.js (v20 or later recommended)
- npm (comes with Node.js)
- PostgreSQL (or your preferred database)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/prisma-graphql-demo.git
   cd prisma-graphql-demo
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up your environment variables in a `.env` file:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
   ```

4. Run database migrations:
   ```
   yarn run migrate:dev
   ```

## Usage

To start the GraphQL server:
The GraphQL playground will be available at `http://localhost:4000/graphql` (or the port specified in your environment variables).

## GraphQL Schema

The GraphQL schema defines the following types:

- `Product`: Represents a product with fields like id, name, price, and inventory.
- `Order`: Represents an order with fields like id, userId, productId, and quantity.
- `User`: Represents a user with fields like id, name, and email.

Key queries and mutations include:

- `getProduct(id: ID!): Product`
- `createOrder(userId: ID!, productId: ID!, quantity: Int!): Order`

(Add more details about your schema as necessary)

## Testing

```
   yarn run test
```
