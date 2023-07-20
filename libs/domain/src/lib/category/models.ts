import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  nama_kategori: string;

  @Column()
  slug_category: string;

  @Column()
  image_category: string;

  @OneToMany(() => Product, (product) => product.category, { eager: true })
  products: Product[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: null, nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date | null;
}
