import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

let EndPoint = URL.END_POINT;

export const addBook = createAsyncThunk('addBook', async body => {
  try {
    const token = await AsyncStorage.getItem('token');

    const {data} = await axios.post(URL.BASE_URL + EndPoint.addProposal, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('addBook', data);
    return {data};
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const updateProposal = createAsyncThunk('updateProposal', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.proposalChange, body);

    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const soldProposal = createAsyncThunk('soldProposal', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.proposalAccept, body);

    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});
export const bookValidation = createAsyncThunk('bookValidation', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.bookValidation, body);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

const addBookSlice = createSlice({
  name: 'proposalsInsert',

  initialState: {
    addBookState: null,
    updateProposalState: null,
    isLoading: false,
    soldProposalState: null,
    validationState: null,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addBookState = action.payload?.data;
    });
    builders.addCase(addBook.pending, state => {
      state.isLoading = true;
      state.addBookState = null;
    });
    builders.addCase(updateProposal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateProposalState = action.payload?.data;
    });
    builders.addCase(updateProposal.pending, state => {
      state.isLoading = true;
      state.updateProposalState = null;
    });
    builders.addCase(soldProposal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.soldProposalState = action.payload?.data;
    });
    builders.addCase(soldProposal.pending, state => {
      state.isLoading = true;
      state.soldProposalState = null;
    });
    builders.addCase(bookValidation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validationState = action.payload?.data;
    });
  },
});
export default addBookSlice.reducer;
export const {loadingState} = addBookSlice.actions;
