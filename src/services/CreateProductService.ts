import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Product from '../models/Product';

interface Request {
  name: string;
  description: string;
  amount_in_stock: number;
  price: number;
}

class CreateProductService {
  public async execute({ 
    name, 
    description, 
    amount_in_stock,
    price,
   }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const checkProductExists = await productRepository.findOne({
      where: { name },
    });

    if (checkProductExists) {
      throw new AppError('Product name already exists');
    }

    const product = productRepository.create({
      name, 
      description, 
      amount_in_stock,
      price,
    });

    await productRepository.save(product);

    return product;
  }
}
export default CreateProductService;
