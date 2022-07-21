import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './Product';
import Purchase from './Purchase';

@Entity('purchases_items')
class PurchaseItem {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'purchase_id' })
  @ManyToOne(() => Purchase) 
  purchase?: Purchase;
  
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product) 
  product?: Product;

  @Column()
  amount: number;

  @Column({ name: 'total_price' })
  totalPrice: number;
}

export default PurchaseItem;
