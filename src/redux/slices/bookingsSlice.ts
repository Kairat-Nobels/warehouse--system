/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { booksApi } from "../../api/api";
import { Room } from "./roomsSlice";

export interface Booking {
  id?: number;
  event: Room;
  eventId: number | string;
  eventName: string;
  name: string;
  phone: string;
  ticketsCount: number;
  amount: number;
  status: string;
  createdAt?: string;
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
  error: null,
  success: null,
};

export const getBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: string }
>("bookings/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(booksApi);
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createBooking = createAsyncThunk<
  Booking,
  Booking,
  { rejectValue: string }
>("bookings/create", async (newBooking, { rejectWithValue }) => {
  try {
    const res = await fetch(booksApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    const data = await res.json();
    toast.success("Покупка билетов успешно оформлена");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const updateBooking = createAsyncThunk<
  Booking,
  { id: number; updatedData: Partial<Booking> },
  { rejectValue: string }
>("bookings/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${booksApi}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    const data = await res.json();
    toast.success("Заказ успешно обновлён");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteBooking = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("bookings/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${booksApi}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    toast.success("Заказ успешно удалён");
    return id;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const bookingsSlice = createSlice({
  name: "bookingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.isLoading = false;
          state.bookings = action.payload;
        }
      )
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при загрузке заказов";
      })

      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.isLoading = false;
          state.bookings.push(action.payload);
          state.success = "Покупка билетов успешно оформлена";
        }
      )
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при оформлении заказа";
      })

      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.isLoading = false;
          const index = state.bookings.findIndex(
            (b) => b.id === action.payload.id
          );
          if (index !== -1) {
            state.bookings[index] = action.payload;
          }
          state.success = "Заказ успешно обновлён";
        }
      )
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при обновлении заказа";
      })

      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteBooking.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.bookings = state.bookings.filter(
            (b) => b.id !== action.payload
          );
          state.success = "Заказ успешно удалён";
        }
      )
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при удалении заказа";
      });
  },
});

export default bookingsSlice.reducer;
