import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let EndPoint = URL.END_POINT;

export const profileData = createAsyncThunk('profileData', async () => {
  try {
    const {data} = await API.get(URL.BASE_URL + EndPoint.userProfile);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const updateProfile = createAsyncThunk('updateProfile', async body => {
  try {
    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.post(
      URL.BASE_URL + EndPoint.updateProfile,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(data);

    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const getUserSchool = createAsyncThunk('schoolSearch', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.schoolSearch, body);

    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

const profileSlice = createSlice({
  name: 'profile',

  initialState: {
    userProfileState: null,
    updateProfileState: null,
    isLoading: false,
    schoolSearch: null,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
    fetchUserProfileInfo: (state, actions) => {
      state.userProfileState = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(profileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfileState = action.payload?.data;
    });
    builders.addCase(profileData.pending, state => {
      state.isLoading = true;
      state.userProfileState = null;
    });
    builders.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateProfileState = action.payload?.data;
    });
    builders.addCase(updateProfile.pending, state => {
      state.isLoading = true;
      state.updateProfileState = null;
    });
    builders.addCase(getUserSchool.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schoolSearch = action.payload?.data;
    });
  },
});
export default profileSlice.reducer;
export const {loadingState} = profileSlice.actions;
