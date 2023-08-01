import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
import axios from 'axios';
import Toast from 'react-native-toast-message';

let EndPoint = URL.END_POINT;

export const login = createAsyncThunk('login', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.authLogin, body);
    await AsyncStorage.setItem('token', data?.token);
    return {data};
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: 'Invalid email or password',
    });
    return;
  }
});

export const register = createAsyncThunk('register', async body => {
  try {
    const {data} = await axios.post(
      URL.BASE_URL + EndPoint.authRegister,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return {data};
  } catch (err: any) {
    if (err.message === 'Request failed with status code 409') {
      Toast.show({
        type: 'error',
        text1: 'User Already Exist',
      });
    }
    return;
  }
});

const authSlice = createSlice({
  name: 'Auth',

  initialState: {
    loginState: null,
    registerState: null,
    isLoading: false,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginState = action.payload?.data;
    });
    builders.addCase(login.pending, state => {
      state.isLoading = true;
      state.loginState = null;
    });
    builders.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerState = action.payload?.data;
    });

    builders.addCase(register.pending, state => {
      state.isLoading = true;
      state.registerState = null;
    });
  },
});
export default authSlice.reducer;
export const {loadingState} = authSlice.actions;
