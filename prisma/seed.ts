import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 插入用户数据
  await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Doe', email: 'jane.doe@example.com' },
      { name: 'Alice Smith', email: 'alice.smith@example.com' },
      { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
    ],
  });

  // 插入产品数据
  await prisma.product.createMany({
    data: [
      { name: 'Laptop', price: 1200.0, inventory: 10 },
      { name: 'Smartphone', price: 800.0, inventory: 20 },
      { name: 'Headphones', price: 150.0, inventory: 50 },
      { name: 'Tablet', price: 500.0, inventory: 30 },
    ],
  });

  // 插入订单数据
  await prisma.order.createMany({
    data: [
      { userId: 1, productId: 1, quantity: 2 },
      { userId: 2, productId: 3, quantity: 1 },
      { userId: 3, productId: 2, quantity: 3 },
      { userId: 4, productId: 4, quantity: 1 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
