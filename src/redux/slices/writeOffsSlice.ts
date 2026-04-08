/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { writeOffsApi, productsApi } from "../../api/api";

export interface WriteOff {
  id?: number;
  productId: number;
  quantity: number;
  reason: string;
  date: string;
  comment: string;
}

interface WriteOffsState {
  writeOffs: WriteOff[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WriteOffsState = {
  writeOffs: [],
  isLoading: false,
  error: null,
};

export const getWriteOffs = createAsyncThunk(
  "writeOffs/getWriteOffs",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(writeOffsApi);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка загрузки списаний"
      );
    }
  }
);

export const createWriteOff = createAsyncThunk(
  "writeOffs/createWriteOff",
  async (writeOff: WriteOff, thunkAPI) => {
    try {
      const { data: product } = await axios.get(
        `${productsApi}/${writeOff.productId}`
      );

      if (Number(product.quantity) < Number(writeOff.quantity)) {
        return thunkAPI.rejectWithValue("Недостаточно товара на складе");
      }

      const { data: createdWriteOff } = await axios.post(
        writeOffsApi,
        writeOff
      );

      await axios.patch(`${productsApi}/${writeOff.productId}`, {
        quantity: Number(product.quantity) - Number(writeOff.quantity),
      });

      return createdWriteOff;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка создания списания"
      );
    }
  }
);

export const deleteWriteOff = createAsyncThunk(
  "writeOffs/deleteWriteOff",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${writeOffsApi}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка удаления списания"
      );
    }
  }
);

const writeOffsSlice = createSlice({
  name: "writeOffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWriteOffs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWriteOffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.writeOffs = action.payload;
      })
      .addCase(getWriteOffs.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка загрузки списаний");
      })

      .addCase(createWriteOff.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWriteOff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.writeOffs.unshift(action.payload);
        toast.success("Списание успешно добавлено");
      })
      .addCase(createWriteOff.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка создания списания");
      })

      .addCase(deleteWriteOff.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWriteOff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.writeOffs = state.writeOffs.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Списание удалено");
      })
      .addCase(deleteWriteOff.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка удаления списания");
      });
  },
});

export default writeOffsSlice.reducer;
