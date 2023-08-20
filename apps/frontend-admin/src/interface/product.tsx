import { Category } from './category';

export interface Product {
  product_id: number;
  name: string;
  image_product: string;
  slug_product: string;
  category: Category;
  description: string;
  price: number;
  weight: number;
  countInStock: number;
  created_at: string;
  updated_at: string;
}

export interface ProductState {
  product: Product | any;
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: any;
}
