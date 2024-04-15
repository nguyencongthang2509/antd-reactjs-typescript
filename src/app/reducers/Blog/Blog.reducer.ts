import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../../interface/Blog.interface";
import { RootState } from "../../store";

const initialState: IBlog[] = [];

export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    AddBlog: (state, action: PayloadAction<IBlog>) => {
      state.push(action.payload);
      return state;
    },
    UpdateBlog: (state, action: PayloadAction<IBlog>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          metaDescription: action.payload.metaDescription,
          content: action.payload.content,
          photoURL: action.payload.photoURL,
          categoryBlogId: action.payload.categoryBlogId,
        };
        return state;
      }
    },
    PutBlog: (state, action: PayloadAction<IBlog>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          metaDescription: action.payload.metaDescription,
          content: action.payload.content,
          photoURL: action.payload.photoURL,
          categoryBlogId: action.payload.categoryBlogId,
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteBlog: (state, action: PayloadAction<IBlog>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetBlog: (state, action: PayloadAction<IBlog[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddBlog, UpdateBlog, DeleteBlog, PutBlog, SetBlog } =
  BlogSlice.actions;

export const GetBlog = (state: RootState) => state.blog;
export default BlogSlice.reducer;
