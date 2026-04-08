/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { usersApi } from "../../api/api";

interface AdminState {
  admin: any | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const savedAdmin = localStorage.getItem("admin");

const initialState: AdminState = {
  admin: savedAdmin ? JSON.parse(savedAdmin) : null,
  isAuth: !!savedAdmin,
  isLoading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (
    { login, password }: { login: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.get(usersApi);

      const foundAdmin = data.find(
        (user: any) => user.login === login && user.password === password
      );

      if (!foundAdmin) {
        return thunkAPI.rejectWithValue("Неверный логин или пароль");
      }

      return foundAdmin;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    outAdmin: (state) => {
      state.admin = null;
      state.isAuth = false;
      state.error = null;
      localStorage.removeItem("admin");
      toast.info("Вы вышли из системы");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.isAuth = true;
        localStorage.setItem("admin", JSON.stringify(action.payload));
        toast.success("Вход выполнен успешно");
      })
      .addCase(loginAdmin.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        toast.error(action.payload || "Ошибка авторизации");
      });
  },
});

export const { outAdmin } = adminSlice.actions;
export default adminSlice.reducer;
