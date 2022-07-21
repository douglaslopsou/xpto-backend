import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Customer from '../models/Customer';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

const customersRouter = Router();

customersRouter.get('/', async (request, response) => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.find();

  return response.json(customer);
});

customersRouter.post('/', async (request, response) => {
  const { 
    status,
    cnpj_cpf,
    name,
    address,
    email,
    obs,
    logo 
  } = request.body;

  const createCustomer = new CreateCustomerService();

  const customer = await createCustomer.execute({
    status,
    cnpj_cpf,
    name,
    address,
    email,
    obs,
    logo
  });

  return response.json(customer);
});

customersRouter.put('/:cnpjCpf', async (request, response) => {
  const { cnpjCpf } = request.params;
  const {
    status,
    name,
    address,
    email,
    obs,
    logo
  } = request.body;

  const customerRepository = getRepository(Customer);

  const customer = await customerRepository.findOne( { where: { cnpj_cpf: cnpjCpf } } );

  if (customer) {
    customer.status = status;
    customer.name = name;
    customer.address = address;
    customer.email = email;
    customer.obs = obs;
    customer.logo = logo;

    await customerRepository.save(customer);

    return response.json(customer);   
  }else{
    throw new AppError('Customer does not exists');
  }
});

customersRouter.delete('/:cnpjCpf', async (request, response) => {
  const { cnpjCpf } = request.params;

  const deleteCustomer = new DeleteCustomerService();

  const customer = await deleteCustomer.execute({ cnpjCpf });

  return response.json(customer);

});

export default customersRouter;
