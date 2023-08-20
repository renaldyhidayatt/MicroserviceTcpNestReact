export interface Order {
  order_id: number;
  nama: string;
  phone: string;
  provinsi: string;
  kota: string;
  alamat: string;
  kurir: string;
  shippingMethod: string;
  total_price: string;
  total_product: string;
}

export interface CreateOrderData {
  user_id: number;
  nama: string;
  phone: string;
  provinsi: string;
  kota: string;
  alamat: string;
  kurir: string;
  shippingMethod: string;
  shippingCost: number;
  totalProduct: string;
  totalPrice: number;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: any;
}
