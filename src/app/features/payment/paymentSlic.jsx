import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paxAxios } from "app/axiosIntercepter";
import { toast } from "react-toastify";


// Async Thunk: Initiates Razorpay order
export const initiateRecharge = createAsyncThunk(
  "payment/initiateRecharge",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await paxAxios.post("/payment/recharge-wallet", { amount: amount * 100 });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Payment failed");
    }
  }
);

// Payment Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    order: null,
    success: false,
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.order = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateRecharge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateRecharge.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(initiateRecharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
