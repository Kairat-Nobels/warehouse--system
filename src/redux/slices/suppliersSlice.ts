/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { suppliersApi } from "../../api/api";

export interface Supplier {
  id?: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

interface SuppliersState {
  suppliers: Supplier[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SuppliersState = {
  suppliers: [],
  isLoading: false,
  error: null,
};

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(suppliersApi);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка загрузки поставщиков");
    }
  }
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (supplier: Supplier, thunkAPI) => {
    try {
      const { data } = await axios.post(suppliersApi, supplier);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка создания поставщика");
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async (
    { id, updatedData }: { id: number; updatedData: Partial<Supplier> },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch(`${suppliersApi}/${id}`, updatedData);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка обновления поставщика");
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${suppliersApi}/${id}`);
      return id;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка удаления поставщика");
    }
  }
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createSupplier.fulfilled, (state, action) => {
        state.suppliers.unshift(action.payload);
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default suppliersSlice.reducer;
