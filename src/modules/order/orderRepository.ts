// src/modules/order/orderRepository.ts
import prisma from '../../config/prismaClient';
import { Order, Product, User } from '@prisma/client';

export class OrderRepository {
  // 获取所有订单
  async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        user: true,
        product: true,
      },
    });
  }

  // 通过ID查找订单
  async getOrderById(orderId: number): Promise<Order | null> {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        product: true,
      },
    });
  }

  // 获取产品信息
  async getProductById(productId: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  // 创建订单并更新库存（事务）
  async createOrderWithInventoryUpdate(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Order> {
    return prisma.$transaction(async (prisma) => {
      // 更新库存
      await prisma.product.update({
        where: { id: productId },
        data: { inventory: { decrement: quantity } },
      });

      // 创建订单
      return prisma.order.create({
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
  }

  // 删除订单
  async deleteOrder(orderId: number): Promise<Order | null> {
    return prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  async getOrderUser(userId: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getOrderProduct(productId: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }
}