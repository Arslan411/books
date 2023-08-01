import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';

let EndPoint = URL.END_POINT;

export const forgotPass = createAsyncThunk('forgotPass', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.authForgot, body);

    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const resetPass = createAsyncThunk('resetPass', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.authReset, body);
    console.log('reset', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

const forgotCredentialsSlice = createSlice({
  name: 'forgot',

  initialState: {
    forgotPassword: null,
    resetPassword: null,

    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(forgotPass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.forgotPassword = action.payload?.data;
    });
    builders.addCase(forgotPass.pending, state => {
      state.isLoading = true;
      state.forgotPassword = null;
    });

    builders.addCase(resetPass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resetPassword = action.payload?.data;
    });

    builders.addCase(resetPass.pending, state => {
      state.isLoading = true;
      state.resetPassword = null;
    });
    builders.addCase(resetPass.rejected, state => {
      state.isLoading = false;
      state.resetPassword = null;
    });
  },
});
export default forgotCredentialsSlice.reducer;
export const {loadingState} = forgotCredentialsSlice.actions;
