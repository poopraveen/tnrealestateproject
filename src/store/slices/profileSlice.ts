import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchInterceptor } from '../../app/lib/fetchInterceptor';

export const uploadImage = createAsyncThunk(
  'profile/uploadImage',
  async (base64String: string, { rejectWithValue }) => {
    try {
      // Convert Base64 to Blob
      const byteCharacters = atob(base64String.split(',')[1]); // Remove header (data:image/png;base64,...)
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Extract file type from Base64 string
      const mimeType = base64String.match(/^data:(.*?);base64,/)?.[1] || 'image/png';
      const fileBlob = new Blob([byteArray], { type: mimeType });

      // Create FormData and append Blob
      const formData = new FormData();
      formData.append('file', fileBlob, `image.${mimeType.split('/')[1]}`);

      // Upload
      const response = await fetchInterceptor('https://real-pro-service.onrender.com/api/file/upload','POST', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.text();
      console.log("getData, response", data);  // Log the actual data here

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postProfileData = createAsyncThunk(
  'profile/postProfileData',
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await fetchInterceptor('https://real-pro-service.onrender.com/api/leads','POST', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to post profile data');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const putProfileData: any = createAsyncThunk(
  'profile/putProfileData',
  async ({ leadId, profileData }: { leadId: string; profileData: any }, { rejectWithValue }) => {
    try {
      const response = await fetchInterceptor(`https://real-pro-service.onrender.com/api/leads/${leadId}`,'PUT', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead data');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

interface Profile {
  personalDetails: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
  };
  contactDetails: {
    phone: string;
    email: string;
    address: string;
    preferredContact: string;
  };
  propertyPreferences: {
    type: string;
    budgetMin: number;
    budgetMax: number;
    location: string;
    desiredFeatures: string;
  };
  financialDetails: {
    employmentStatus: string;
    income: number;
    downPayment: number;
    creditScore: number;
  };
  propertyHistory: {
    currentHousing: string;
    reasonForMoving: string;
    previousAgent: string;
  };
  additionalInfo: {
    referralSource: string;
    marketingConsent: boolean;
  };
  termsAgreement: boolean;
}

interface ProfileState {
  profile: any | null;
  customers: any[];  // Add this to store leads
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  imageUrl: string | null; // Add a field for the uploaded image URL
}

const initialState: ProfileState = {
  profile: null,
  customers: [],
  status: 'idle',
  error: null,
  imageUrl: null, // Initialize imageUrl to null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
      state.status = 'succeeded';
    },
    profileLoading(state) {
      state.status = 'loading';
    },
    profileError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    setImageUrl(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload; // Store the image URL after upload
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle image upload
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrl = action.payload; // Assuming the uploaded image URL is returned here
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle creating a lead (POST)
      .addCase(postProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postProfileData.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(postProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle updating a lead (PUT)
      .addCase(putProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putProfileData.fulfilled, (state, action) => {
        const updatedLead = action.payload;
        const index = state.customers.findIndex((lead) => lead.id === updatedLead.id);
        if (index !== -1) {
          state.customers[index] = updatedLead;
        }
        state.status = 'succeeded';
      })
      .addCase(putProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addProfile, profileLoading, profileError, setImageUrl } = profileSlice.actions;

export default profileSlice.reducer;
