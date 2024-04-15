import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../interface/Product.interface";
import { RootState } from "../../store";

const initialState: IProduct[] = [];

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        SetProduct: (state, action: PayloadAction<IProduct[]>) => {
            state = action.payload;
            return state;
        },
        AddProduct: (state, action: PayloadAction<IProduct>) => {
            state = [action.payload].concat(state);
            return state;
        },
        UpdateProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state[index] = {
                    ...state[index],
                    title: action.payload.title,
                    price: action.payload.price,
                    color: action.payload.color,
                    size: action.payload.size,
                    categoryProductId: action.payload.categoryProductId,
                    photoURL: action.payload.photoURL,
                    metaDescription: action.payload.metaDescription,
                };
                return state;
            }
        },
        DeleteProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetProduct, AddProduct, DeleteProduct, UpdateProduct } = ProductSlice.actions;
export const GetProduct = (state: RootState) => state.product;
export default ProductSlice.reducer;
