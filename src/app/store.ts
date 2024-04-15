import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AccountReducer from "./reducers/Account/Account.reducer";
import AuthReducer from "./reducers/Auth/Auth.reducer";
import CategoryBlogReducer from "./reducers/CategoryBlog/CategoryBlog.reducer";
import ContactReducer from "./reducers/Contact/Contact.reducer";
import FeedbackReducer from "./reducers/Feedback/Feedback.reducer";
import LoadingReducer from "./reducers/Loading/Loading.reducer";
import ProductReducer from "./reducers/Product/Product.reducer";
import CategoryProductReducer from "./reducers/CategoryProduct/CategoryProduct.reducer";
import BannerReducer from "./reducers/Banner/Banner.reducer";
import BlogReducer from "./reducers/Blog/Blog.reducer";
import OrderReducer from "./reducers/Order/Order.reducer";
import OrderProductReducer from "./reducers/OrderProduct/OrderProduct.reducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    loading: LoadingReducer,
    categoryBlog: CategoryBlogReducer,
    categoryProduct: CategoryProductReducer,
    product: ProductReducer,
    account: AccountReducer,
    feedback: FeedbackReducer,
    contact: ContactReducer,
    banner: BannerReducer,
    blog: BlogReducer,
    order:OrderReducer,
    orderProduct:OrderProductReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
