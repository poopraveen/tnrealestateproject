import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define Types for the State
interface PieData {
  name: string;
  value: number;
  color: string;
}

interface BarData {
  name: string;
  SM1: number;
  SM2: number;
  SM3: number;
}

interface ProjectData {
  title: string;
  description: string;
  image: string;
}

interface DataState {
  pieData: PieData[];
  barData: BarData[];
  projectData: ProjectData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: DataState = {
  pieData: [],
  barData: [],
  projectData: [],
  status: "idle",
  error: null,
};

// Async Thunks for API Calls
export const fetchPieData = createAsyncThunk<PieData[]>("data/fetchPieData", async () => {
  const response = await fetch("/api/pieData");
  return response.json();
});

export const fetchBarData = createAsyncThunk<BarData[]>("data/fetchBarData", async () => {
  const response = await fetch("/api/barData");
  return response.json();
});

export const fetchProjectData = createAsyncThunk<ProjectData[]>("data/fetchProjectData", async () => {
  const response = await fetch("/api/projectData");
  return response.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPieData: (state, action: PayloadAction<PieData[]>) => {
      state.pieData = action.payload;
    },
    setBarData: (state, action: PayloadAction<BarData[]>) => {
      state.barData = action.payload;
    },
    setProjectData: (state, action: PayloadAction<ProjectData[]>) => {
      state.projectData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPieData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPieData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pieData = action.payload;
      })
      .addCase(fetchPieData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch Pie Data";
      })

      .addCase(fetchBarData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBarData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.barData = action.payload;
      })
      .addCase(fetchBarData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch Bar Data";
      })

      .addCase(fetchProjectData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectData = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch Project Data";
      });
  },
});

export const { setPieData, setBarData, setProjectData } = dataSlice.actions;
export default dataSlice.reducer;
