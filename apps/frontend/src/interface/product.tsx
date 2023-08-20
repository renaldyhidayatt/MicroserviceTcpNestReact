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
}

export interface ProductState {
  product: Product | null;
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: any;
}
