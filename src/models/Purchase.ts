import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import Customer from './Customer';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Purchase;
