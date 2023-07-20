import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  postal_code: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 100 })
  country_code: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ length: 100 })
  total_product: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
