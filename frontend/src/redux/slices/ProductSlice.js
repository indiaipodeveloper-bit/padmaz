import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setAllProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
