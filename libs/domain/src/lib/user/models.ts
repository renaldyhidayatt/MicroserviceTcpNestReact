import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @Column({ default: 'default.jpg' }) // Add the default value for the image column
  image: string;

  @ManyToOne(() => Role)
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
