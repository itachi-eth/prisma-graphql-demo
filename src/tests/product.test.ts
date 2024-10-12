// tests/product.test.ts
import prisma from './__mocks__/prismaClient';
import {
  getAllProducts,
  createProduct,
} from '../modules/product/productService';

jest.mock('../config/prismaClient', () => prisma);

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    const mockProducts = [
      { id: 1, name: 'Laptop', price: 1000.0, inventory: 10 },
      { id: 2, name: 'Phone', price: 500.0, inventory: 20 },
    ];
    prisma.product.findMany.mockResolvedValue(mockProducts);

    const products = await getAllProducts();

    expect(products).toEqual(mockProducts);
    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a new product', async () => {
    const newProduct = { id: 1, name: 'Laptop', price: 1000.0, inventory: 10 };
    prisma.product.create.mockResolvedValue(newProduct);

    const createdProduct = await createProduct('Laptop', 1000.0, 10);

    expect(createdProduct).toEqual(newProduct);
    expect(prisma.product.create).toHaveBeenCalledWith({
      data: { name: 'Laptop', price: 1000.0, inventory: 10 },
    });
  });
});
