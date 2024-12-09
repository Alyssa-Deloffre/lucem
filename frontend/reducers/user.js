import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  type: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToken: (state, action) => {
      state.token = action.payload;
    },
    addUserType: (state, action) => {
      state.type = action.payload;
    },
    disconnectUser: (state, action) => {
      state.token = null;
      state.type = null;
    },
  },
});

export const { addUserToken, addUserType, disconnectUser } = userSlice.actions;
export default userSlice.reducer;
