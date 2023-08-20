import { Product } from './product';

export interface Category {
  category_id: number;
  nama_kategori: string;
  slug_category: string;
  image_category: string;
  created_at: string;
  updated_at: string | null;
  products: Product[]; // Add products here
}

export interface CategoryState {
  category: Category | any;
  categories: Category[];
  loading: boolean;
  error: any;
}
