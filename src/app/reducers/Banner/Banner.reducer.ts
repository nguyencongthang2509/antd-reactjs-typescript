import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBanner } from "../../../interface/Banner.interface";
import { RootState } from "../../store";

const initialState: IBanner[] = [];

export const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    AddBanner: (state, action: PayloadAction<IBanner>) => {
      state.unshift(action.payload);
      return state;
    },
    UpdateBanner: (state, action: PayloadAction<IBanner>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = { ...state[index], photoURL: action.payload.photoURL };
        return state;
      }
    },
    DeleteBanner: (state, action: PayloadAction<IBanner>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetBanner: (state, action: PayloadAction<IBanner[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddBanner, UpdateBanner, DeleteBanner, SetBanner } =
  BannerSlice.actions;

export const GetBanner = (state: RootState) => state.banner;
export default BannerSlice.reducer;
