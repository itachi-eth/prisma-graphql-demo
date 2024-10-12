// src/modules/user/userService.ts
import { User, Order } from '@prisma/client';
import { UserRepository } from './userRepository';

const userRepository = new UserRepository();

// 获取所有用户
export const getAllUsers = async (): Promise<User[]> => {
  return userRepository.getAllUsers();
};

// 创建用户
export const createUser = async (
  name: string,
  email: string,
): Promise<User> => {
  const existingUser = await userRepository.getUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  return userRepository.createUser(name, email);
};

// 获取用户订单
export const getUserOrders = async (userId: number): Promise<Order[]> => {
  return userRepository.getUserOrders(userId);
};
