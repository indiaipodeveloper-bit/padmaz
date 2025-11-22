import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddProductToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    RemoveProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (e) => e._id !== action.payload._id
      );
    },
    IncreaseQuantity:(state,action)=>{
        let product = state.cartItems.find((e)=> e._id === action.payload._id)
    }
  },
});

export const { AddProductToCart, RemoveProductFromCart } = CartSlice.actions;

export default CartSlice.reducer;
