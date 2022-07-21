import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  cnpj_cpf: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  obs: string;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
