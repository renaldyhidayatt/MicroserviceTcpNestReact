import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Role, { eager: true }) // Tambahkan relasi ManyToOne dengan Role
  @JoinColumn({ name: 'role_id' }) // Kolom referensi untuk koneksi
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
