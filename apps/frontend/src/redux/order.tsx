import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';
import { RootState } from './store';
import { CreateOrderData, Order, OrderState } from '../interface';
import { MidtransData } from '../interface/midtrans';

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.get('/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportPdf = createAsyncThunk(
  'order/exportPdf',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/order/export/pdf');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportExcel = createAsyncThunk(
  'order/exportExcel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/order/export/excel');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrderAsync = createAsyncThunk(
  'order/deleteOrder',
  async (orderId: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.delete(`/order/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderData: CreateOrderData, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.post('/order/create', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('formDataOrder', JSON.stringify(orderData));
      localStorage.setItem('order', JSON.stringify(orderData));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  } as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.order_id !== action.payload
        );
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
