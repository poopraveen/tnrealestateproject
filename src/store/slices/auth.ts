import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from 'cookies-next';
import { fetchInterceptor } from '../../app/lib/fetchInterceptor';
import { redirect } from 'next/navigation';

interface AuthState {
  user: { id: string; email: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean
}

// Initial state
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

// API URLs
const BASE_URL = 'https://real-pro-service.onrender.com/api/auth';

// ✅ Login Action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetchInterceptor(`${BASE_URL}/login?username=${email}&password=${password}`,'POST', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      debugger
      setCookie('token', data.token, { path: '/' }); // Store token in cookies
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Signup Action
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetchInterceptor(`${BASE_URL}/signup`,'POST', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Logout Action
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  deleteCookie('token');
  return null;
});

// Create Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ id: string; email: string }>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // ✅ Handle Signup
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<{ id: string; email: string }>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        redirect('/login'); // Redirect to login after signup
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // ✅ Handle Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        redirect('/login'); // Redirect to login after logout
      });
  },
});

export default authSlice.reducer;
