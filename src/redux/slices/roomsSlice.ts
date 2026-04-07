/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roomsApi } from "../../api/api";
import { toast } from "react-toastify";

export interface Room {
  id?: number | string;
  img: string;
  name: string;
  price: number;
  location: string;
  date: string;
  category: string;
  description: string;
  totalSeats: number;
  availableSeats: number;
}

interface RoomsState {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  isLoading: false,
  error: null,
  success: null,
};

export const getRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  "getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(roomsApi);
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  "createRoom",
  async (newRoom, { rejectWithValue }) => {
    try {
      const response = await fetch(roomsApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      toast.success("Мероприятие успешно добавлено");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateRoom = createAsyncThunk<
  Room,
  { id: number; updatedData: Partial<Room> },
  { rejectValue: string }
>(
  "updateRoom",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${roomsApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      toast.success("Мероприятие успешно обновлено");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRoom = createAsyncThunk<number, number, { rejectValue: string }>(
  "deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${roomsApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      toast.success("Мероприятие успешно удалено");
      return id;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при получении мероприятий";
      })

      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        state.rooms.push(action.payload);
        state.success = "Мероприятие успешно добавлено";
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при добавлении мероприятия";
      })

      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.isLoading = false;
        const index = state.rooms.findIndex((room) => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
        state.success = "Мероприятие успешно обновлено";
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при обновлении мероприятия";
      })

      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
        state.success = "Мероприятие успешно удалено";
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Ошибка при удалении мероприятия";
      });
  },
});

export default roomsSlice.reducer;
