import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
type TInitSt = {
  user: null | object;
  token: null | string;
};
const initialState: TInitSt = {
  user: null,
  token: null,
};

const userAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    usersInfo: (state, action) => {
      const { users, token } = action.payload;
      state.user = users;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { usersInfo, logOut } = userAuth.actions;
export const authData = (state: RootState) => state.auth.user;
export default userAuth.reducer;
