// tests/order.test.ts
import prisma from './__mocks__/prismaClient';
import { getAllOrders, createOrder } from '../modules/order/orderService';

jest.mock('../config/prismaClient', () => prisma);

describe('Order Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all orders', async () => {
    const mockOrders = [
      {
        id: 1,
        userId: 1,
        productId: 1,
        quantity: 2,
        user: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        product: { id: 1, name: 'Laptop', price: 1000.0, inventory: 8 },
      },
      {
        id: 2,
        userId: 2,
        productId: 2,
        quantity: 1,
        user: { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
        product: { id: 2, name: 'Phone', price: 500.0, inventory: 19 },
      },
    ];
    prisma.order.findMany.mockResolvedValue(mockOrders);

    const orders = await getAllOrders();

    expect(orders).toEqual(mockOrders);
    expect(prisma.order.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a new order and update inventory', async () => {
    const userId = 1;
    const productId = 1;
    const quantity = 2;

    const product = {
      id: productId,
      name: 'Laptop',
      price: 1000.0,
      inventory: 10,
    };
    const updatedProduct = {
      ...product,
      inventory: product.inventory - quantity,
    };
    const newOrder = {
      id: 1,
      userId,
      productId,
      quantity,
      user: { id: userId, name: 'John Doe', email: 'john.doe@example.com' },
      product: updatedProduct,
    };

    // Mock the necessary Prisma client methods
    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.update.mockResolvedValue(updatedProduct);
    prisma.order.create.mockResolvedValue(newOrder);

    const result = await createOrder(userId, productId, quantity);

    expect(result).toEqual(newOrder);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: productId },
    });
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: productId },
      data: {
        inventory: {
          decrement: quantity,
        },
      },
    });
    expect(prisma.order.create).toHaveBeenCalledWith({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        user: true,
        product: true,
      },
    });
  });

  it('should throw an error if insufficient inventory', async () => {
    const userId = 1;
    const productId = 1;
    const insufficientQuantity = 15;

    const product = {
      id: productId,
      name: 'Laptop',
      price: 1000.0,
      inventory: 10,
    };

    prisma.product.findUnique.mockResolvedValue(product);

    await expect(
      createOrder(userId, productId, insufficientQuantity),
    ).rejects.toThrow('Insufficient inventory');

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: productId },
    });
    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(prisma.order.create).not.toHaveBeenCalled();
  });

  it('should throw an error if product not found', async () => {
    const userId = 1;
    const nonExistingProductId = 999;
    const quantity = 2;

    prisma.product.findUnique.mockResolvedValue(null);

    await expect(
      createOrder(userId, nonExistingProductId, quantity),
    ).rejects.toThrow('Product not found');

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: nonExistingProductId },
    });
    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(prisma.order.create).not.toHaveBeenCalled();
  });
});
