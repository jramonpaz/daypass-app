import { IRecoveryPasswordFormData, IUser, IUserDetail } from '@app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
  isAuth: boolean;
  error: string | undefined;
  isLoading: boolean;
  success: string | undefined;
  seccionUser: IUser | undefined;
  userDetail: IUserDetail | null;
  token: string | undefined;
  recoveryPassForm: IRecoveryPasswordFormData | undefined;
  isValidCode: boolean;
  tokenToRecoveryPass: string | undefined;
  // role: []
}

const initialState: AuthSliceState = {
  isAuth: false,
  error: undefined,
  isLoading: false,
  success: undefined,
  seccionUser: undefined,
  userDetail: null,
  token: undefined,
  recoveryPassForm: undefined,
  isValidCode: false,
  tokenToRecoveryPass: undefined,
  // role: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setSessionUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.seccionUser = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | undefined>) => {
      state.success = action.payload;
    },
    setIsValidCode: (state, action: PayloadAction<boolean>) => {
      state.isValidCode = action.payload;
    },
    setUserDetail: (state, action: PayloadAction<IUserDetail | null>) => {
      state.userDetail = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.error = undefined;
      state.isLoading = false;
    },
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
    setRecoveryPassForm: (state, action: PayloadAction<IRecoveryPasswordFormData | undefined>) => {
      state.recoveryPassForm = action.payload;
    },
    setTokenToRecoveryPass: (state, action: PayloadAction<string | undefined>) => {
      state.tokenToRecoveryPass = action.payload;
    },
    clean: (state) => {
      state.error = undefined;
      // state.isAuth = false;
      state.isLoading = false;
      state.success = undefined;
      // state.recoveryPassForm = undefined;
      state.isValidCode = false;
      // state.tokenToRecoveryPass = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const AuthReducer = authSlice.reducer;

