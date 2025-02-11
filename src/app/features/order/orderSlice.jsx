import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paxAxios } from "app/axiosIntercepter";
import { toast } from "react-toastify";


export const getOrdersAsync = createAsyncThunk(
  "order/getOrders",
  async (status = "DRAFT", { rejectWithValue }) => {
    try {
      const response = await paxAxios.get(`/order/get-orders?status=${status}`);
      return response.data.data || []; 
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to create an order
export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await paxAxios.post("/order/add-order", payload);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create order.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [], // Store all orders based on status
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.orders = [];
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage =
          action.payload?.message || "Order created successfully!";
        toast.success(state.successMessage);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrdersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload || []; // Ensure it's always an array
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
