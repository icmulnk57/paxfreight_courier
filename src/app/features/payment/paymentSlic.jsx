import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paxAxios } from "app/axiosIntercepter";
import { toast } from "react-toastify";

// Async Thunk for Creating Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paxAxios.get("cashfree/payment");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment request failed");
    }
  }
);

export const verifyPay = createAsyncThunk("payment/verify", async (orderId, { rejectWithValue }) => {
  try {
    const response = await paxAxios.post("cashfree/verify", { orderId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Payment verification failed");
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    verificationStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
        toast.success("Payment initiated successfully!");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Payment request failed");
      })
      .addCase(verifyPay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPay.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload;
      })
      .addCase(verifyPay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
