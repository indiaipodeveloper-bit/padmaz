import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/AuthSlice";
import CartSliceReducer from "./slices/CartSlice";
import ProductSliceReducer from "./slices/ProductSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    cart: CartSliceReducer,
    products: ProductSliceReducer,
  },
});
