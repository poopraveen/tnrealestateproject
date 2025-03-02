import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
    id: string;
    data: {
      personalDetails: {
        firstName: string;
        lastName: string;
      };
      financialDetails: {
        downPayment: number;
      };
    };
    image?: string;
  }
  

interface CustomerState {
  customers: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CustomerState = {
  customers: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch customers from API
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://real-pro-service.onrender.com/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectCustomerById = (state: any, id: any) =>
  state.customers.customers.find((cust: any) => cust.id === id);
export default customerSlice.reducer;
