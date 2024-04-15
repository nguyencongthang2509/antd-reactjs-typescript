import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryBlog } from "../../../interface/CategoryBlog.interface";
import { RootState } from "../../store";

const initialState: ICategoryBlog[] = [];

export const CategoryBlogSlice = createSlice({
    name: "categoryBlog",
    initialState,
    reducers: {
        AddCategoryBlog: (state, action: PayloadAction<ICategoryBlog>) => {
            state.push(action.payload);
            return state;
        },
        UpdateCategoryBlog: (state, action: PayloadAction<ICategoryBlog>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state[index] = { ...state[index], title: action.payload.title };
                return state;
            }
        },
        DeleteCategoryBlog: (state, action: PayloadAction<ICategoryBlog>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
        SetCategoryBlog: (state, action: PayloadAction<ICategoryBlog[]>) => {
            state = action.payload;
            return state;
        },
    },
});

export const { AddCategoryBlog, UpdateCategoryBlog, DeleteCategoryBlog, SetCategoryBlog } = CategoryBlogSlice.actions;

export const GetCategoryBlog = (state: RootState) => state.categoryBlog;
export default CategoryBlogSlice.reducer;
