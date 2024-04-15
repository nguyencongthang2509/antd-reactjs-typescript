import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../interface/Order.interface";
import { RootState } from "../../store";

const initialState: IOrder[] = [];

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    AddOrder: (state, action: PayloadAction<IOrder>) => {
      state.push(action.payload);
      return state;
    },
    UpdateOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          code: action.payload.code,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          email: action.payload.email,
          address: action.payload.address,
          city: action.payload.city,
          district: action.payload.district,
          note: action.payload.note,
          status: action.payload.status,
          price: action.payload.price,
          accountId: action.payload.accountId,
        };
        return state;
      }
    },
    PutOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          code: action.payload.code,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          email: action.payload.email,
          address: action.payload.address,
          city: action.payload.city,
          district: action.payload.district,
          note: action.payload.note,
          status: action.payload.status,
          price: action.payload.price,
          accountId: action.payload.accountId,
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetOrder: (state, action: PayloadAction<IOrder[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddOrder, UpdateOrder, DeleteOrder, PutOrder, SetOrder } = OrderSlice.actions;

export const GetOrder = (state: RootState) => state.order;
export default OrderSlice.reducer;
