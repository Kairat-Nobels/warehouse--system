import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import suppliersReducer from "./slices/suppliersSlice";
import receiptsReducer from "./slices/receiptsSlice";
import writeOffsReducer from "./slices/writeOffsSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    adminReducer,
    productsReducer,
    categoriesReducer,
    suppliersReducer,
    receiptsReducer,
    writeOffsReducer,
    feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;