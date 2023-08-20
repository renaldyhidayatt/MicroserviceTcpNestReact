import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import sliderReducer from './slider';
import categoryReducer from './category';
import productReducer from './product';
import cartReducer from './cart';
import orderReducer from './order';
import rajaongkir from './rajaongkir';
import {
  AuthState,
  CartState,
  CategoryState,
  OrderState,
  ProductState,
} from '../interface';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    slider: sliderReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    rajaOngkir: rajaongkir,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
