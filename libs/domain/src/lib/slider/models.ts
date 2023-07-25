import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  slider_id: number;

  @Column({ length: 255 })
  nama: string;

  @Column({ length: 255 })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
