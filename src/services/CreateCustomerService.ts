import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Customer from '../models/Customer';

interface Request {
  status: string;
  cnpj_cpf: string;
  name: string;
  address: string;
  email: string;
  obs: string;
  logo: string;
}

class CreateCustomerService {
  public async execute({
    status,
    cnpj_cpf,
    name,
    address,
    email,
    obs,
    logo 
  }: Request): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    const checkCustomerExists = await customerRepository.findOne({
      where: { cnpj_cpf },
    });

    if (checkCustomerExists) {
      throw new AppError('Customer cnpj/cpf already exists');
    }

    const customer = customerRepository.create({
      status,
      cnpj_cpf,
      name,
      address,
      email,
      obs,
      logo 
    });

    await customerRepository.save(customer);

    return customer;
  }
}
export default CreateCustomerService;
