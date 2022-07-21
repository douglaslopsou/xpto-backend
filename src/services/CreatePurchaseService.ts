import { createQueryBuilder, getRepository, In } from 'typeorm';

import AppError from '../errors/AppError';
import Customer from '../models/Customer';
import Product from '../models/Product';
import Purchase from '../models/Purchase';
import PurchaseItem from '../models/PurchaseItem';

interface Request {
  purchaseDate: Date,
  customerDoc: number;
  items: Item[];
}

interface Item {
  productId: string;
  amount: number;
  totalPrice: number;
}

interface ResponsePurchase {
  id: string;
  purchaseDate: Date;
  items: {
    product: {
      id: string;
      name: string;
      price: number;
    }
    amount: number;
    totalPrice: number;
  }[];
  totalPrice: number;
}

class CreatePurchaseService {
  public async execute({ 
    purchaseDate,
    customerDoc,
    items,
   }: Request): Promise<ResponsePurchase> {
    const purchaseRepository = getRepository(Purchase);
    const customerRepository = getRepository(Customer); 

    // VALIDATE IF CUSTOMER EXISTS
    const customerInPurchase = await customerRepository.findOne({
      where: { cnpj_cpf: customerDoc },
    });

    if (!customerInPurchase) {
      throw new AppError('Customer does not exists');
    }

    // VALIDATE IF ALL PRODUCTS EXISTS
    const productsInPurchase = await createQueryBuilder(Product, 'product').
    select([ 'product.id', 'product.name', 'product.price', 'product.amount_in_stock' ]).
    where('product.id IN (:...productIds)', { productIds: items.map(({ productId }) => productId )}).getMany();

    if(!items.every(({ productId }) => productsInPurchase.some(({ id }) => id === productId))) {
      throw new AppError('One or more products does not exists');
    }

    // CALCULATE TOTAL PRICE OF PURCHASE
    const totalPurchasePrice = items.reduce((acc, { productId, amount }) => {
      const product: Product | undefined = productsInPurchase.find(({ id }) => id === productId);
      if(!product) {
        return acc;  
      }
      return acc + product.price * amount;
    }, 0);

    const purchase = await purchaseRepository.save({
      purchaseDate: purchaseDate,
      customer: customerInPurchase,
      totalPrice: totalPurchasePrice,
    });

    const purchaseItems = items.map(({ productId, amount }) => {
      const product = productsInPurchase.find(({ id }) => id === productId);
      
      if(!product) {
        throw new AppError('One or more products does not exists');
      }

      // VALIDATE IF PRODUCT HAS ENOUGH AMOUNT IN STOCK
      if(product.amount_in_stock < amount) {
        throw new AppError(`Amount is not avaliable in stock, product ${product.name}, disponivel: ${product.amount_in_stock}`);
      }else{
        product.amount_in_stock -= amount;
      }

      // DECREASE AMOUNT IN STOCK
      const productRepository = getRepository(Product);
      productRepository.save(product);

      return {
        product: { id: product.id, name: product.name, price: product.price },
        purchase: { id: purchase.id },
        totalPrice: product.price * amount,
        amount
      }
    })

    const purchaseItemsRepository = getRepository(PurchaseItem);
    purchaseItemsRepository.save(purchaseItems);

    return {
      id: purchase.id,
      purchaseDate: purchase.purchaseDate,
      items: purchaseItems.map(({ product, amount, totalPrice }) => ({
        product: {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price.toString()),
        },
        amount,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      })),
      totalPrice: parseFloat(totalPurchasePrice.toFixed(2)),
    };
  }
}
export default CreatePurchaseService;
