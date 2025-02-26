import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the project structure
interface ProjectData {
  id?: string;
  name: string;
  plots: number;
}

// Define state structure
interface ProjectState {
  data: ProjectData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  Addstatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  data: [],
  status: "idle",
  Addstatus: "idle",
  error: null,
};

// Async thunk to fetch projects from API
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await fetch("https://real-pro-service.onrender.com/api/projects"); // Replace with actual API
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await response.json();  // Wait for the json data
  console.log("getData, response", data);  // Log the actual data here
  
  return data;
});

// Async thunk to add a new project
export const addProjectData: any = createAsyncThunk(
  "projects/addProjectData",
  async (newProject: any, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await fetch('https://real-pro-service.onrender.com/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error('Failed to post profile data');
      }
      const data = await response.json();  // Wait for the json data
      console.log("getData, response", data);  // Log the actual data here

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initialize action to reset state
export const initializeProjects:any = createAsyncThunk(
  "projects/initializeProjects",
  async () => {
    // Initialization logic can go here if needed (e.g., resetting state)
    return;
  }
);

// Project slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initialize state
      .addCase(initializeProjects.pending, (state) => {
        state.status = "idle";
        state.Addstatus = "idle";
        state.error = null;
        state.data = [];
      })

      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<ProjectData[]>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.data = [];
        state.error = action.error.message || "Failed to fetch projects";
      })

      // Add project
      .addCase(addProjectData.pending, (state) => {
        state.Addstatus = "loading";
      })
      .addCase(addProjectData.fulfilled, (state, action: PayloadAction<ProjectData>) => {
        state.Addstatus = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addProjectData.rejected, (state, action) => {
        state.Addstatus = "failed";
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectProjects = (state: RootState) => state.projects.data;
export const selectProjectsState = (state: RootState) => state.projects;
export const selectProjectStatus = (state: RootState) => state.projects.status;
export const selectProjectError = (state: RootState) => state.projects.error;

export default projectSlice.reducer;
