/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteToken } from "../../../helper/userToken";
import { IAccount } from "../../../interface/Account.interface";
import { RootState } from "../../store";

interface AuthReducer {
  user?: IAccount;
}

const initialState: AuthReducer = {
  user: undefined,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UpdateUser: (state, action: PayloadAction<IAccount>) => {
      state.user = action.payload;
    },
    UserLogout: (state) => {
      state.user = undefined;
      deleteToken();
    },
  },
});

export const { UpdateUser, UserLogout } = AuthSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default AuthSlice.reducer;
