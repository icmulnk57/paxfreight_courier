import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paxAxios } from "app/axiosIntercepter";
import { toast } from "react-toastify";


export const loginUserAsync = createAsyncThunk(
  "/auth/signin",
  async (loginCredential) => {
    const response = await paxAxios.post("/auth/signin", loginCredential);
    return response;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "/login/reset",
  async (payload) => {
    await paxAxios.post("/login/reset", { username: payload.username });
  }
);


const initialState = {
  user: null,
  authStatus: false,
  loading: "idle",
  token: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.authStatus = false;
      state.token = null;
      localStorage.clear();
      window.location.reload();
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authStatus = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const responseData = action.payload.data; 
        const userData = responseData.user; 

        state.authStatus = true;
        state.user = {
          userid: userData.userId, 
          username: userData.username, 
          email: userData.email, 
          type: userData.type, 
          kyc_status: userData.kyc_status, 
        };
        state.token = responseData.token; 
        state.loading = "success";

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...state.user, token: state.token })
        );

        toast.success(responseData.message);
        console.log(responseData);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.authStatus = false;
        state.loading = "failed";
        if (action.error.message) {
          toast.error(action.error.message);
        }
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading = "success";
        toast.success("Password reset link sent to your email.");
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = "failed";
        if (action.error.message) {
          toast.error("Password reset failed. Please try again.");
        }
      });
  },
});

// Exporting the logout action and the reducer
export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
