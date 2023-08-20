import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { myApi } from '../helpers/api';
import { CartData, CartItem, CartState } from '../interface';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartDto: CartData, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.post('/cart', cartDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartId: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      await myApi.delete(`/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return cartId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteManyFromCart = createAsyncThunk(
  'cart/deleteManyFromCart',
  async (cartIds: any, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.post(
        '/cart/delete-many',
        { cartIds: cartIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data.data.deletedIds;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  } as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const cartId = action.payload;
        state.cartItems = state.cartItems.filter(
          (item) => item.cart_id !== cartId
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteManyFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteManyFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = action.payload;
        state.cartItems = state.cartItems.filter(
          (item) => !deletedIds.includes(item.cart_id)
        );
      })
      .addCase(deleteManyFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
