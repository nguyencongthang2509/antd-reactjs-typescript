import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedback } from "../../../interface/Feedback.interface";
import { RootState } from "../../store";

const initialState: IFeedback[] = [];

export const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    DeleteFeedback: (state, action: PayloadAction<IFeedback>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetFeedback: (state, action: PayloadAction<IFeedback[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { DeleteFeedback, SetFeedback } = FeedbackSlice.actions;

export const GetFeedback = (state: RootState) => state.feedback;
export default FeedbackSlice.reducer;
