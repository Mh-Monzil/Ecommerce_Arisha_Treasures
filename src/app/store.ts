import { commonApi } from "@/features/api";
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/features/authSlice";

export const store = configureStore({
  reducer: {
    ["commonApi"]: commonApi.reducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
