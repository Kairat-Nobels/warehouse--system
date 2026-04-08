/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { feedbackApi } from "../../api/api";

export interface Feedback {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface FeedbackState {
  feedback: Feedback[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedback: [],
  isLoading: false,
  error: null,
};

export const getFeedback = createAsyncThunk(
  "feedback/getFeedback",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(feedbackApi);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка загрузки сообщений"
      );
    }
  }
);

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (
    feedbackData: Omit<Feedback, "id" | "createdAt">,
    thunkAPI
  ) => {
    try {
      const payload = {
        ...feedbackData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      const { data } = await axios.post(feedbackApi, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка отправки сообщения"
      );
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${feedbackApi}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Ошибка удаления сообщения"
      );
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedback = action.payload;
      })
      .addCase(getFeedback.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Ошибка загрузки сообщений");
      })

      .addCase(createFeedback.fulfilled, (state, action) => {
        state.feedback.unshift(action.payload);
        toast.success("Сообщение успешно отправлено");
      })
      .addCase(createFeedback.rejected, (action: any) => {
        toast.error(action.payload || "Ошибка отправки сообщения");
      })

      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedback = state.feedback.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Сообщение удалено");
      })
      .addCase(deleteFeedback.rejected, (action: any) => {
        toast.error(action.payload || "Ошибка удаления сообщения");
      });
  },
});

export default feedbackSlice.reducer;
