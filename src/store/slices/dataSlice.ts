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

interface Lead {
  id: number;
  name: string;
  date: string;
  status: "new" | "pending" | "finished";
}

interface DataState {
  pieData: PieData[];
  barData: BarData[];
  projectData: ProjectData[];
  leads: Lead[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: DataState = {
  pieData: [],
  barData: [],
  projectData: [],
  leads: [],
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

export const fetchLeads = createAsyncThunk<Lead[]>("data/fetchLeads", async () => {
  const response = await fetch("/api/leads");
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
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: number; status: "new" | "pending" | "finished" }>) => {
      const lead = state.leads.find((lead) => lead.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
      }
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
      })

      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch Leads";
      });
  },
});

export const { setPieData, setBarData, setProjectData, setLeads, updateLeadStatus } = dataSlice.actions;
export default dataSlice.reducer;
