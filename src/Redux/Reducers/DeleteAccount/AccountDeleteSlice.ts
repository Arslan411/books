import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

let EndPoint = URL.END_POINT;

export const deleteAccount = createAsyncThunk('deleteAccount', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.deleteAccount, body);
    console.log('deleteaccount', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const userVerification = createAsyncThunk(
  'userVerification',
  async body => {
    try {
      const {data} = await API.post(
        URL.BASE_URL + EndPoint.deleteAccVerification,
        body,
      );
      console.log('deleteaccountVERFICATION', data);
      return {data};
    } catch (err) {
      console.log(err);
      return;
    }
  },
);

const deleteSlice = createSlice({
  name: 'delete',

  initialState: {
    deleteAccState: null,
    userVerificationState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(deleteAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteAccState = action.payload?.data;
    });
    builders.addCase(deleteAccount.pending, state => {
      state.isLoading = true;
      state.deleteAccState = null;
    });
    builders.addCase(userVerification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userVerificationState = action.payload?.data;
    });
  },
});
export default deleteSlice.reducer;
export const {loadingState} = deleteSlice.actions;
