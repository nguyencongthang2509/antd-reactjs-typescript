import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../../../interface/Contact.interface";
import { RootState } from "../../store";

const initialState: IContact[] = [];

export const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    DeleteContact: (state, action: PayloadAction<IContact>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetContact: (state, action: PayloadAction<IContact[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { DeleteContact, SetContact } = ContactSlice.actions;

export const GetContact = (state: RootState) => state.contact;
export default ContactSlice.reducer;
