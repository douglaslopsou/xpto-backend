import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product from '../models/Product';
import PurchaseItem from '../models/PurchaseItem';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<[]> {
    const productRepository = getRepository(Product);
    const purchaseItemRepository = getRepository(PurchaseItem);

    // const checkProductInPurchaseExists = await purchaseItemRepository.find({
    //   where: { id },
    // });

    // if (checkProductInPurchaseExists) {
    //   throw new AppError('Product was in some purchase and cant be deleted');
    // }

    await productRepository.delete(id);

    return [];
  }
}
export default DeleteProductService;
