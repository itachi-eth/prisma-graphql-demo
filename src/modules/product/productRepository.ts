// src/modules/product/productRepository.ts
import prisma from '../../config/prismaClient';
import { Product, Order } from '@prisma/client';

export class ProductRepository {
  // 获取所有产品
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  // 通过ID查找产品
  async getProductById(productId: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  // 创建新产品
  async createProduct(
    name: string,
    price: number,
    inventory: number,
  ): Promise<Product> {
    return prisma.product.create({
      data: {
        name,
        price,
        inventory,
      },
    });
  }

  // 更新产品信息
  async updateProduct(
    productId: number,
    name?: string,
    price?: number,
    inventory?: number,
  ): Promise<Product | null> {
    return prisma.product.update({
      where: { id: productId },
      data: {
        name: name || undefined,
        price: price || undefined,
        inventory: inventory || undefined,
      },
    });
  }

  // 删除产品
  async deleteProduct(productId: number): Promise<Product | null> {
    return prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async getProductOrders(productId: number): Promise<Order[]> {
    const productWithOrders = await prisma.product.findUnique({
      where: { id: productId },
      include: { orders: true },
    });
    return productWithOrders?.orders || [];
  }
}
