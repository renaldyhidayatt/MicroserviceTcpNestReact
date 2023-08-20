import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';
import { Category, CategoryState } from '../interface';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/category');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await myApi.get(`/category/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (createCategory: FormData, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/category/create', createCategory, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryById = createAsyncThunk<
  Category,
  { id: number; formData: FormData }
>('categories/updateById', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await myApi.put<Category>(`/category/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategoryById = createAsyncThunk<number, number>(
  'categories/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await myApi.delete(`/category/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: CategoryState = {
  category: null,
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        const categoryIndex = state.categories.findIndex(
          (category) => category.category_id === action.payload.category_id
        );
        if (categoryIndex !== -1) {
          state.categories[categoryIndex] = action.payload;
        }
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.category_id !== action.payload
        );
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
