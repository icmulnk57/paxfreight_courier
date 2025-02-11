import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/order/orderSlice";
import paymentReducer from "../features/payment/paymentSlic";
import profileSlice from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    payment: paymentReducer,
    profile: profileSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
