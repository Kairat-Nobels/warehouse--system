/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { categoriesApi } from "../../api/api";

export interface Category {
  id?: number;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(categoriesApi);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка загрузки категорий"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category: Category, thunkAPI) => {
    try {
      const { data } = await axios.post(categoriesApi, category);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка создания категории"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (
    { id, updatedData }: { id: number; updatedData: Partial<Category> },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch(
        `${categoriesApi}/${id}`,
        updatedData
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка обновления категории"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${categoriesApi}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка удаления категории"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка загрузки категорий");
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload);
        toast.success("Категория успешно добавлена");
      })
      .addCase(createCategory.rejected, (action: any) => {
        toast.error(action.payload || "Ошибка создания категории");
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        toast.success("Категория успешно обновлена");
      })
      .addCase(updateCategory.rejected, (action: any) => {
        toast.error(action.payload || "Ошибка обновления категории");
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Категория успешно удалена");
      })
      .addCase(deleteCategory.rejected, (action: any) => {
        toast.error(action.payload || "Ошибка удаления категории");
      });
  },
});

export default categoriesSlice.reducer;
