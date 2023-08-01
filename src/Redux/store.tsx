import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/Authentication/AuthReducer';
import GetCitiesSlice from './Reducers/Authentication/GetCitiesSlice';
import GetSchool from './Reducers/Authentication/GetSchool';
import UserConfirmation from './Reducers/Authentication/UserConfirmation';
import ForgotSlice from './Reducers/Authentication/ForgotSlice';
import ProposalSlice from './Reducers/Proposals/ProposalSlice';
import InsertProposal from './Reducers/Proposals/InsertProposal';
import ProfileSlice from './Reducers/User/ProfileSlice';
import AccountDeleteSlice from './Reducers/DeleteAccount/AccountDeleteSlice';
import CredentialChange from './Reducers/Authentication/CredentialChange';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cities: GetCitiesSlice,
    insitutes: GetSchool,
    varifyUser: UserConfirmation,
    resetPassword: ForgotSlice,
    proposalLists: ProposalSlice,
    addProposal: InsertProposal,
    profile: ProfileSlice,
    userDelete: AccountDeleteSlice,
    authCredentials: CredentialChange,
  },
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
