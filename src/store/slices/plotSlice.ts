import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the plot structure
interface PlotData {
  id?: string;
  plotName: string;
  size: number;
  facing: string;
}

// Define state structure for plots
interface PlotState {
  data: PlotData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  addStatus: "idle" | "loading" | "succeeded" | "failed";
}

// Initial state for plots
const initialState: PlotState = {
  data: [],
  status: "idle",
  error: null,
  addStatus: "idle",
};

// Async thunk to fetch plots for a given projectId
export const fetchPlots: any = createAsyncThunk(
  "plots/fetchPlots",
  async (projectId: string) => {
    const response = await fetch(`https://real-pro-service.onrender.com/api/plots/project/${projectId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch plots');
    }

    const data = await response.json();
    console.log("getData, response", data);  // Log the actual data here
    
    return data;
  }
);

// Async thunk to add a new plot
export const addPlot: any = createAsyncThunk(
    'plots/addPlot',
    async (newPlot: PlotData, { rejectWithValue }) => {
      try {
        const response = await fetch('https://real-pro-service.onrender.com/api/plots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlot),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add plot');
        }
  
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Plot slice
const plotSlice = createSlice({
  name: "plots",
  initialState,
  reducers: {
    resetPlotsState: (state) => {
        state.data = [];
        state.status = 'idle';
        state.addStatus = 'idle';
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      // Fetch plots
      .addCase(fetchPlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlots.fulfilled, (state, action: PayloadAction<PlotData[]>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPlots.rejected, (state, action) => {
        state.status = "failed";
        state.data = [];
        state.error = action.error.message || "Failed to fetch plots";
      })
      // Add new plot
      .addCase(addPlot.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addPlot.fulfilled, (state, action: PayloadAction<PlotData>) => {
        state.addStatus = 'succeeded';
        state.data.push(action.payload); // Add the new plot to the data array
      })
      .addCase(addPlot.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetPlotsState } = plotSlice.actions;
// Selectors
export const selectPlots = (state: RootState) => state.plots.data;
export const selectPlotStatus = (state: RootState) => state.plots.status;
export const selectPlotError = (state: RootState) => state.plots.error;
export const selectAddPlotStatus = (state: RootState) => state.plots.addStatus;

export default plotSlice.reducer;
