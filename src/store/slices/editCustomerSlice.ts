import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCustomerById : any= createAsyncThunk(
  'customer/fetchCustomerById',
  async (id) => {
    const response = await fetch(`https://real-pro-service.onrender.com/api/leads/${id}`);
    const data = await response.json();
    return data.data;
  }
);

export const updateCustomerData: any = createAsyncThunk(
    'customer/updateCustomerData',
    async (customerData: any) => {
      const response = await fetch(`https://real-pro-service.onrender.com/api/leads/${customerData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',  // ✅ Fix: Specify JSON content type
        },
        body: JSON.stringify(customerData.data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    }
  );
  

const customerSlice = createSlice({
  name: 'customer',
  initialState: { customerData: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.customerData = action.payload;
      })
      .addCase(updateCustomerData.fulfilled, (state, action) => {
        state.customerData = action.payload;
      });
  },
});

export default customerSlice.reducer;
