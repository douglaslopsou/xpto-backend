import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Product from '../models/Product';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productRepository = getRepository(Product);
  const product = await productRepository.find();

  return response.json(product);
});

productsRouter.post('/', async (request, response) => {
  const { 
    name, 
    description, 
    amount_in_stock,
    price,
  } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name, 
    description, 
    amount_in_stock,
    price,
  });

  return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    name, 
    description, 
    amount_in_stock,
    price,
  } = request.body;

  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(id);

  if (product) {
    product.name = name;
    product.description = description;
    product.amount_in_stock = amount_in_stock;
    product.price = price;

    await productRepository.save(product);

    return response.json(product);   
  }else{
    throw new AppError('Product does not exists');
  }
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductService();

  const product = await deleteProduct.execute({ id });

  return response.json(product);

});

export default productsRouter;
