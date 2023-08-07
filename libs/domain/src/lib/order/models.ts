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
  nama: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 100 })
  provinsi: string;

  @Column({ length: 100 })
  kota: string;

  @Column({ length: 100 })
  alamat: string;

  @Column({ length: 100 })
  kurir: string;

  @Column({ length: 100 })
  shippingMethod: string;

  @Column()
  shippingCost: number;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ length: 100 })
  total_product: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
