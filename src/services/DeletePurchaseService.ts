import { getRepository } from 'typeorm';
import Purchase from '../models/Purchase';

interface Request {
  id: string;
}

class DeletePurchaseService {
  public async execute({ id }: Request): Promise<[]> {
    const purchaseRepository = getRepository(Purchase);

    await purchaseRepository.delete(id);

    return [];
  }
}
export default DeletePurchaseService;
