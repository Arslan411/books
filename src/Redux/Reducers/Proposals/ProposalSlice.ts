import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../../../Utils/Services/URL';
import API from '../../../Utils/Services/APIManager';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

let EndPoint = URL.END_POINT;

export const proposalList = createAsyncThunk('proposalList', async () => {
  try {
    const {data} = await API.get(URL.BASE_URL + EndPoint.getProposalsList);
    console.log('prosoalListts', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const randomProposals = createAsyncThunk('randomProposals', async () => {
  try {
    const {data} = await API.get(URL.BASE_URL + EndPoint.getRandomProposals);
    // console.log('randomlListts', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const searchByISBN = createAsyncThunk('searchBooks', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.bookSearch, body);
    // console.log('search ttet->', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const proposalSearch = createAsyncThunk('proposalSearch', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.proposalSearch, body);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const proposalAround = createAsyncThunk('proposalAround', async () => {
  try {
    const {data} = await API.get(URL.BASE_URL + EndPoint.proposalAround);
    // console.log('fakee', data);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const proposalReport = createAsyncThunk('proposalReport', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.proposalReport, body);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

export const proposalRevoke = createAsyncThunk('proposalRevoke', async body => {
  try {
    const {data} = await API.post(URL.BASE_URL + EndPoint.proposalRevoke, body);
    return {data};
  } catch (err) {
    console.log(err);
    return;
  }
});

const booksSlice = createSlice({
  name: 'proposals',

  initialState: {
    proposalListState: null,
    randomProposalState: null,
    isLoading: false,
    searchBooks: null,
    isAllProposals: null,
    fakeProposals: null,
    reportProposals: null,
    revokeProposal: null,
  },

  reducers: {
    loadingState: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },

  extraReducers: builders => {
    builders.addCase(proposalList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.proposalListState = action.payload?.data;
    });
    builders.addCase(proposalList.pending, state => {
      state.isLoading = true;
      state.proposalListState = null;
    });

    builders.addCase(randomProposals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.randomProposalState = action.payload?.data;
    });
    builders.addCase(randomProposals.pending, state => {
      state.isLoading = true;
      state.randomProposalState = null;
    });
    builders.addCase(searchByISBN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchBooks = action.payload?.data;
    });

    builders.addCase(proposalSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAllProposals = action.payload?.data;
    });

    builders.addCase(proposalAround.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fakeProposals = action.payload?.data;
    });

    builders.addCase(proposalReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reportProposals = action.payload?.data;
    });
    builders.addCase(proposalRevoke.fulfilled, (state, action) => {
      state.isLoading = false;
      state.revokeProposal = action.payload?.data;
    });
    builders.addCase(proposalRevoke.pending, state => {
      state.isLoading = true;
      state.revokeProposal = null;
    });
  },
});
export default booksSlice.reducer;
export const {loadingState} = booksSlice.actions;
