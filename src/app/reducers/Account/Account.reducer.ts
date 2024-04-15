import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../../interface/Account.interface";
import { RootState } from "../../store";

const initialState: IAccount[] = [];

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    SetAccount: (state, action: PayloadAction<IAccount[]>) => {
      state = action.payload;
      return state;
    },
    UpdateAccount: (state, action: PayloadAction<IAccount>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);

      if (index > -1) {
        state[index] = {
          ...state[index],
          avatar: action.payload.avatar,
        };
        return state;
      }
    },
    DeleteAccount: (state, action: PayloadAction<IAccount>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.slice(index, 1);
      }
      return state;
    },
  },
});
export const { SetAccount, UpdateAccount, DeleteAccount } =
  AccountSlice.actions;
export const GetAccount = (state: RootState) => state.account;
export default AccountSlice.reducer;
