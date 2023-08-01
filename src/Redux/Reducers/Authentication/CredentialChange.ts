import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';

let EndPoint = URL.END_POINT;

export const authCredentials = createAsyncThunk(
  'authCredentials',
  async body => {
    try {
      const {data} = await API.post(
        URL.BASE_URL + EndPoint.authCredentials,
        body,
      );
      return {data};
    } catch (err) {
      console.log(err);
      return;
    }
  },
);
export const authChange = createAsyncThunk('authChange', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.authChange, body);
    console.log('change Auth', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

const authChangeSlice = createSlice({
  name: 'Credentials',

  initialState: {
    authState: null,
    authChangeState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(authCredentials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authState = action.payload?.data;
    });
    builders.addCase(authCredentials.pending, state => {
      state.isLoading = true;
      state.authState = null;
    });
    builders.addCase(authChange.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authChangeState = action.payload?.data;
    });
  },
});
export default authChangeSlice.reducer;
export const {loadingState} = authChangeSlice.actions;
