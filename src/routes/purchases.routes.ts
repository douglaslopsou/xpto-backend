import { Router } from 'express';
import { Between, getRepository } from 'typeorm';

import Purchase from '../models/Purchase';
import CreatePurchaseService from '../services/CreatePurchaseService';
import DeletePurchaseService from '../services/DeletePurchaseService';

const purchasesRouter = Router();

purchasesRouter.get('/', async (request, response) => {
  const purchaseRepository = getRepository(Purchase);
  const purchase = await purchaseRepository.find();

  return response.json(purchase);
});

purchasesRouter.get('/byCustomer/:id', async (request, response) => {
  const { id } = request.params;

  const purchaseRepository = getRepository(Purchase);

  const purchases = await purchaseRepository.find({
    where: {
      customer: { id: id },
    },
    relations: ["customer"],
  });

  return response.json(purchases);
});

purchasesRouter.get('/byCustomerAndDate', async (request, response) => {
  const { startDate, endDate, customer_id } = request.query;

  const purchaseRepository = getRepository(Purchase);

  const purchases = await purchaseRepository.find({
    where: {
      customer: { id: customer_id },
      purchaseDate: Between (startDate, endDate),
    },
    relations: ["customer"],
  });

  return response.json(purchases);
});

purchasesRouter.post('/', async (request, response) => {
  const { 
    purchaseDate,
    customerDoc,
    items,
  } = request.body;

  const createPurchase = new CreatePurchaseService();

  const purchase = await createPurchase.execute({
    purchaseDate,
    customerDoc,
    items,
  });

  return response.json(purchase);
});

purchasesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletePurchase = new DeletePurchaseService();

  const purchase = await deletePurchase.execute({ id });

  return response.json(purchase);

});

export default purchasesRouter;
