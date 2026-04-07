/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { adminApi } from '../../api/api';

interface AdminCredentials {
  login: string;
  password: string;
}

interface AdminState {
  valid: boolean;
}

interface AdminUser {
  login: string;
  password: string | number;
}

const initialState: AdminState = {
  valid: localStorage.getItem('admin') === 'true',
};

export const loginAdmin = createAsyncThunk<boolean, AdminCredentials, { rejectValue: string }>(
  'admin/login',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(adminApi);
      const data: AdminUser[] = await res.json();

      const user = data.find(
        u => u.login === login && u.password.toString() === password
      );

      if (!user) {
        toast.error('Неверный логин или пароль');
        return rejectWithValue('Неверные данные');
      }

      toast.success('Успешный вход!');
      localStorage.setItem('admin', 'true');
      return true;
    } catch (err: any) {
      toast.error('Ошибка сервера');
      return rejectWithValue(err.message || 'Неизвестная ошибка');
    }
  }
);

export const outAdmin = createAsyncThunk<boolean>(
  'admin/logout',
  async () => {
    localStorage.removeItem('admin');
    toast.success('Вы вышли из системы');
    return false;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.valid = action.payload;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.valid = false;
      })
      .addCase(outAdmin.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.valid = action.payload;
      });
  },
});

export default adminSlice.reducer;
