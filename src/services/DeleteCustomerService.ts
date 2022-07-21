import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Customer from '../models/Customer';
import Purchase from '../models/Purchase';

interface Request {
  cnpjCpf: string;
}

class DeleteCustomerService {
  public async execute({ cnpjCpf }: Request): Promise<[]> {
    const customerRepository = getRepository(Customer);
    
    await customerRepository.delete({ cnpj_cpf: cnpjCpf });

    return [];
  }
}
export default DeleteCustomerService;
