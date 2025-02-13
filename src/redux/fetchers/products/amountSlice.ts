import { createSlice } from "@reduxjs/toolkit";

const amount = createSlice({
  name: "amount",
  initialState: { amount: 0 },
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    rmAmount: (state) => {
      state.amount = 0;
    },
  },
});

export default amount.reducer;
export const { setAmount, rmAmount } = amount.actions;
