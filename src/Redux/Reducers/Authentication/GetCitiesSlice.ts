// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

let EndPoint = URL.END_POINT;

export const getCities = createAsyncThunk('getCities', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.getCities, body);
    return {data};
  } catch (err) {
    console.log('Err', err);
    return;
  }
});

const citySlice = createSlice({
  name: 'Cities',

  initialState: {
    cityState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(getCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cityState = action.payload?.data;
    });
    builders.addCase(getCities.pending, state => {
      state.isLoading = true;
      state.cityState = null;
    });
  },
});
export default citySlice.reducer;
export const {loadingState} = citySlice.actions;
