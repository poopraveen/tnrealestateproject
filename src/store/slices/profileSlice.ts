import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
      const response = await fetch('https://real-pro-service.onrender.com/api/file/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const postProfileData = createAsyncThunk(
  'profile/postProfileData',
  async (profileData: any, { rejectWithValue }) => {
    try {
      // Assuming you are using fetch to post the data
      const response = await fetch('https://real-pro-service.onrender.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error('Failed to post profile data');
      }
      return await response.json(); // or response.data depending on your API structure
    } catch (error: any) {
      return rejectWithValue(error.message);
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
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { addProfile, profileLoading, profileError } = profileSlice.actions;

export default profileSlice.reducer;
