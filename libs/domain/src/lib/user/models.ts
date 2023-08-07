import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from '../cart/models';
import { Role } from '../role/models';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 30 })
  firstname: string;

  @Column({ length: 30 })
  lastname: string;

  @Column({ length: 30 })
  email: string;

  @Column({ length: 70 })
  password: string;

  @Column({ default: 'default.jpg' })
  image: string;

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user) // One user has many carts
  cartItems: Cart[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
