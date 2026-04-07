import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import servicesReducer from "../slices/servicesSlice";
// import recordsReducer from "../slices/recordSlice";
// import doctorsReducer from "../slices/doctorsSlice";
import reviewsReducer from "./slices/reviewsSlice";
import roomsReducer from "./slices/roomsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import adminReducer from "./slices/adminSlice";
// import adminReducer from "../slices/adminSlice";

const reducer = combineReducers({
  reviewsReducer,
  roomsReducer,
  bookingsReducer,
  adminReducer
})
export const store = configureStore({
  reducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;