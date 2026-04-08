/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { receiptsApi, productsApi } from "../../api/api";

export interface Receipt {
  id?: number;
  productId: number;
  supplierId: number;
  quantity: number;
  price: number;
  totalAmount: number;
  date: string;
  comment: string;
}

interface ReceiptsState {
  receipts: Receipt[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReceiptsState = {
  receipts: [],
  isLoading: false,
  error: null,
};

export const getReceipts = createAsyncThunk(
  "receipts/getReceipts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(receiptsApi);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка загрузки поступлений"
      );
    }
  }
);

export const createReceipt = createAsyncThunk(
  "receipts/createReceipt",
  async (receipt: Receipt, thunkAPI) => {
    try {
      // создаем поступление
      const { data: createdReceipt } = await axios.post(receiptsApi, receipt);

      // получаем товар
      const { data: product } = await axios.get(
        `${productsApi}/${receipt.productId}`
      );

      // обновляем остаток
      await axios.patch(`${productsApi}/${receipt.productId}`, {
        quantity: Number(product.quantity) + Number(receipt.quantity),
      });

      return createdReceipt;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка создания поступления"
      );
    }
  }
);

export const deleteReceipt = createAsyncThunk(
  "receipts/deleteReceipt",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${receiptsApi}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка удаления поступления"
      );
    }
  }
);

const receiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceipts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receipts = action.payload;
      })
      .addCase(getReceipts.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка загрузки поступлений");
      })

      .addCase(createReceipt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receipts.unshift(action.payload);
        toast.success("Поступление успешно добавлено");
      })
      .addCase(createReceipt.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка создания поступления");
      })

      .addCase(deleteReceipt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receipts = state.receipts.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Поступление удалено");
      })
      .addCase(deleteReceipt.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка удаления поступления");
      });
  },
});

export default receiptsSlice.reducer;
