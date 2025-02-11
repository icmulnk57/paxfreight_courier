import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paxAxios } from "app/axiosIntercepter";
import { toast } from "react-toastify";

// Fetch user profile details
export const getProfileDetails = createAsyncThunk(
  "profile/getProfileDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paxAxios.get("/admin/get-user-details");
      return response.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch profile details";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await paxAxios.put("/admin/update-profile", profileData);
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Update KYC
export const updateKyc = createAsyncThunk(
  "profile/updateKyc",
  async (kycData, { rejectWithValue }) => {
    try {
      const response = await paxAxios.put("/admin/updateKyc", kycData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("KYC updated successfully! Verification is pending.");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update KYC";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle",
    profileStatus: "idle", // New state for getProfileDetails
    error: null,
    kycStatus: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    setKycStatus: (state, action) => {
      state.kycStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Details
      .addCase(getProfileDetails.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(getProfileDetails.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(getProfileDetails.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update KYC
      .addCase(updateKyc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateKyc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kycStatus = action.payload;
      })
      .addCase(updateKyc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setProfile, setKycStatus } = profileSlice.actions;
export default profileSlice.reducer;
