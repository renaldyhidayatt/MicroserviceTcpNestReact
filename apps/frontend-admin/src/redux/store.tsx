import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';
import orderReducer from './order';
import roleReducer from './role';
import sliderReducer from './slider';
import userReducer from './user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    role: roleReducer,
    slider: sliderReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
