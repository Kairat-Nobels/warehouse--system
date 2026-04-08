/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { productsApi } from "../../api/api";

export interface Product {
  id?: number;
  name: string;
  article: string;
  categoryId: number;
  supplierId: number;
  unit: string;
  price: number;
  quantity: number;
  minStock: number;
  image: string;
  description: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(productsApi);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка загрузки товаров"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Product, thunkAPI) => {
    try {
      const { data } = await axios.post(productsApi, product);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка создания товара"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, updatedData }: { id: number; updatedData: Partial<Product> },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch(`${productsApi}/${id}`, updatedData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка обновления товара"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${productsApi}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка удаления товара"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка загрузки товаров");
      })

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
        toast.success("Товар успешно добавлен");
      })
      .addCase(createProduct.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка создания товара");
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        toast.success("Товар успешно обновлён");
      })
      .addCase(updateProduct.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка обновления товара");
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Товар успешно удалён");
      })
      .addCase(deleteProduct.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка удаления товара");
      });
  },
});

export default productsSlice.reducer;
