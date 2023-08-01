// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';

let EndPoint = URL.END_POINT;

export const userConfirmation = createAsyncThunk(
  'userConfirmation',
  async body => {
    try {
      const {data} = await API.post(
        URL.BASE_URL + EndPoint.authConfirmation,
        body,
      );
      return {data};
    } catch (err) {
      console.log('Err', err);
      return;
    }
  },
);

const userConfirmationSlice = createSlice({
  name: 'otp',

  initialState: {
    confirmationState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(userConfirmation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.confirmationState = action.payload?.data;
    });
    builders.addCase(userConfirmation.pending, state => {
      state.isLoading = true;
      state.confirmationState = null;
    });
  },
});
export default userConfirmationSlice.reducer;
export const {loadingState} = userConfirmationSlice.actions;
