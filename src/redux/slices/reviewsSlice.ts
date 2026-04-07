/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reviewsApi } from "../../api/api";
import { toast } from "react-toastify";

export interface Review {
  id?: number;
  name: string;
  phone: string;
  comment: string;
}

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  delLoading: boolean;
  delMessage: string | null;
  delError: string | null;
  error: string | null;
  success: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  delLoading: false,
  delMessage: null,
  delError: null,
  error: null,
  success: null
};

export const getReviews = createAsyncThunk<Review[], void, { rejectValue: string }>(
  "getReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(reviewsApi);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createReview = createAsyncThunk<string, Review, { rejectValue: string }>(
  "createReview",
  async (review, { rejectWithValue }) => {
    try {
      const res = await fetch(reviewsApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
      });
      if (res.status === 201) {
        toast.success("Вы успешно оставили отзыв");
        return "Вы успешно оставили отзыв";
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk<number, number, { rejectValue: string }>(
  "deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${reviewsApi}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {}, // 👈 обязательно указываем, даже если пустой
  extraReducers: builder => {
    builder
      .addCase(getReviews.pending, state => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.error = action.payload || "Ошибка получения отзывов";
        state.loading = false;
      })

      .addCase(createReview.pending, state => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.success = action.payload;
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при отправке отзыва";
        state.loading = false;
      })

      .addCase(deleteReview.pending, state => {
        state.delLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<number>) => {
        state.reviews = state.reviews.filter(r => r.id !== action.payload);
        state.delLoading = false;
        toast.success("Отзыв успешно удалён");
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.delError = action.payload || "Ошибка при удалении";
        state.delLoading = false;
        toast.error("Ошибка при удалении");
      });
  }
});

export default reviewsSlice.reducer;
