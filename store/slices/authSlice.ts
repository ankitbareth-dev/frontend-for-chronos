import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
  authCheck as authCheckApi,
} from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// --- Async Thunks ---
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await signupApi(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      return res.user; // expected shape: { id, name, email }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authCheckApi(); // this uses credentials
      return user;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    });

    // Auth Check
    builder.addCase(
      checkAuth.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(checkAuth.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
