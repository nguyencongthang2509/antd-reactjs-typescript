import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderProduct } from "../../../interface/OrderProduct.interface";
import { RootState } from "../../store";

const initialState: IOrderProduct[] = [];

export const OrderProductSlice = createSlice({
  name: "orderProduct",
  initialState,
  reducers: {
    AddOrderProduct: (state, action: PayloadAction<IOrderProduct>) => {
      state.push(action.payload);
      return state;
    },
    UpdateOrderProduct: (state, action: PayloadAction<IOrderProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
        
        };
        return state;
      }
    },
    PutOrderProduct: (state, action: PayloadAction<IOrderProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
         
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteOrderProduct: (state, action: PayloadAction<IOrderProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetOrderProduct: (state, action: PayloadAction<IOrderProduct[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddOrderProduct, UpdateOrderProduct, DeleteOrderProduct, PutOrderProduct, SetOrderProduct } = OrderProductSlice.actions;

export const GetOrderProduct = (state: RootState) => state.orderProduct;
export default OrderProductSlice.reducer;
