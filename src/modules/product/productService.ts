// src/modules/product/productService.ts
import { Product, Order } from '@prisma/client';
import { ProductRepository } from './productRepository';

const productRepository = new ProductRepository();

// 获取所有产品
export const getAllProducts = async (): Promise<Product[]> => {
  return productRepository.getAllProducts();
};

// 创建产品
export const createProduct = async (
  name: string,
  price: number,
  inventory: number,
): Promise<Product> => {
  return productRepository.createProduct(name, price, inventory);
};

// 获取产品的订单
export const getProductOrders = async (productId: number): Promise<Order[]> => {
  return productRepository.getProductOrders(productId);
};
