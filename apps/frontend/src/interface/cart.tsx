export interface CartItem {
  cart_id: number | any;
  name: string;
  price: number;
  image_product: string;
  quantity: number;
  product_id: number;
  weight: number;
}

export interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: any;
}

export interface CartData {
  name: string;
  price: number;
  image_product: string;
  quantity: number;
  product_id: number;
  user_id: number;
  weight: number;
}
