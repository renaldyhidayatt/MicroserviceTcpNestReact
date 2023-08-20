import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';
import { RootState } from './store';
import { RajaOngkirState } from '../interface';

export const fetchProvinces = createAsyncThunk(
  'rajaOngkir/fetchProvinces',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.get('/rajaongkir', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.rajaongkir.results;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const fetchCities = createAsyncThunk(
  'rajaOngkir/fetchCities',
  async (provId: number, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.get(`/rajaongkir/kota/${provId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.rajaongkir.results;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const calculateShippingCost = createAsyncThunk(
  'rajaOngkir/calculateShippingCost',
  async (
    { asal, tujuan, berat, kurir }: any,
    { rejectWithValue, getState }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await myApi.post(
        `/rajaongkir/cost`,
        {
          asal,
          tujuan,
          berat,
          kurir,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.rajaongkir.results;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: RajaOngkirState = {
  provinces: [],
  cities: [],
  shippingCosts: [],
  loading: false,
  error: null,
};

const rajaOngkirSlice = createSlice({
  name: 'rajaOngkir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(calculateShippingCost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateShippingCost.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingCosts = action.payload;
      })
      .addCase(calculateShippingCost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rajaOngkirSlice.reducer;
