import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const productDis = createSlice({
  name: "product",
  initialState,
  reducers: {
    products: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default productDis.reducer;
export const { products } = productDis.actions;
