import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryProduct } from "../../../interface/CategoryProduct.interface";
import { RootState } from "../../store";

const initialState: ICategoryProduct[] = [];

export const CategoryProductSlice = createSlice({
    name: "categoryProduct",
    initialState,
    reducers: {
        AddCategoryProduct: (state, action: PayloadAction<ICategoryProduct>) => {
            state.push(action.payload);
            return state;
        },
        UpdateCategoryProduct: (state, action: PayloadAction<ICategoryProduct>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state[index] = {
                    ...state[index],
                    title: action.payload.title,
                    photoURL: action.payload.photoURL,
                };
                return state;
            }
        },
        DeleteCategoryProduct: (state, action: PayloadAction<ICategoryProduct>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
        SetCategoryProduct: (state, action: PayloadAction<ICategoryProduct[]>) => {
            state = action.payload;
            return state;
        },
    },
});

export const { AddCategoryProduct, UpdateCategoryProduct, DeleteCategoryProduct, SetCategoryProduct } = CategoryProductSlice.actions;

export const GetCategoryProduct = (state: RootState) => state.categoryProduct;
export default CategoryProductSlice.reducer;
