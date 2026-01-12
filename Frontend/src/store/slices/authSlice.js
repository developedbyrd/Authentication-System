import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authorized");
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  fullname: localStorage.getItem("fullname") || null,
  email: localStorage.getItem("email") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutLocal: (state) => {
      state.user = null;
      state.token = null;
      state.fullname = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.fullname = action.payload.user?.fullname || action.payload.user?.name;
        state.email = action.payload.user?.email;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("fullname", state.fullname);
        localStorage.setItem("email", state.email);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.fullname = action.payload.user?.fullname || action.payload.user?.name;
        state.email = action.payload.user?.email;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("fullname", state.fullname);
        localStorage.setItem("email", state.email);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.fullname = null;
        state.email = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");
        localStorage.removeItem("email");
      });
  },
});

export const { clearError, logoutLocal } = authSlice.actions;
export default authSlice.reducer;
