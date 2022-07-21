import { Router } from 'express';
import customersRouter from './customers.routes';
import productsRouter from './products.routes';
import purchasesRouter from './purchases.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/products', productsRouter);
routes.use('/purchases', purchasesRouter);

export default routes;
