// src/modules/user/userRepository.ts
import prisma from '../../config/prismaClient';
import { User, Order } from '@prisma/client';

export class UserRepository {
  // 获取所有用户
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  // 通过ID查找用户
  async getUserById(userId: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  // 通过Email查找用户
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // 创建新用户
  async createUser(name: string, email: string): Promise<User> {
    return prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  // 更新用户信息
  async updateUser(
    userId: number,
    name?: string,
    email?: string,
  ): Promise<User | null> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
    });
  }

  // 删除用户
  async deleteUser(userId: number): Promise<User | null> {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId: userId },
    });
  }
}
