import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    SetCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    AddProductToCart: (state, action) => {
      if (state.cartItems.find((e) => e.title === action.payload.title)) {
        return;
      }
      state.cartItems.push(action.payload);
    },
    RemoveProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (e) => e.title !== action.payload.title
      );
    },
    IncreaseQuantity: (state, action) => {
      let product = state.cartItems.find(
        (e) => e.title === action.payload.title
      );
      product.quantity += 1;
    },
    DecreaseQuantity: (state, action) => {
      let product = state.cartItems.find(
        (e) => e.title === action.payload.title
      );
      if (product.quantity == 1) {
        return;
      }
      product.quantity -= 1;
    },
  },
});

export const {
  AddProductToCart,
  RemoveProductFromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  SetCartItems,
} = CartSlice.actions;

export default CartSlice.reducer;
