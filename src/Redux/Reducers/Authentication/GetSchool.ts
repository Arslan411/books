// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

let EndPoint = URL.END_POINT;

export const getSchool = createAsyncThunk('getSchool', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.getInsitutes, body);
    return {data};
  } catch (err) {
    console.log('Err', err);
    return;
  }
});

const schoolSlice = createSlice({
  name: 'School',

  initialState: {
    insituteState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(getSchool.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insituteState = action.payload?.data;
    });
    builders.addCase(getSchool.pending, state => {
      state.isLoading = true;
      state.insituteState = null;
    });
  },
});
export default schoolSlice.reducer;
export const {loadingState} = schoolSlice.actions;
