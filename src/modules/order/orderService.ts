// src/modules/order/orderService.ts
import { Order, User, Product } from '@prisma/client';
import { OrderRepository } from './orderRepository';

const orderRepository = new OrderRepository();

export const getAllOrders = async (): Promise<Order[]> => {
  return orderRepository.getAllOrders();
};

// 创建订单
export const createOrder = async (
  userId: number,
  productId: number,
  quantity: number,
): Promise<Order> => {
  const product = await orderRepository.getProductById(productId);
  if (!product || product.inventory < quantity) {
    throw new Error('Insufficient inventory');
  }

  return orderRepository.createOrderWithInventoryUpdate(
    userId,
    productId,
    quantity,
  );
};

export const getOrderUser = async (userId: number): Promise<User | null> => {
  return orderRepository.getOrderUser(userId);
};

export const getOrderProduct = async (
  productId: number,
): Promise<Product | null> => {
  return orderRepository.getOrderProduct(productId);
};
