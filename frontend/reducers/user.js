import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   nomdelafonction: (state, action) => {
		//trucs qu'on veut faire avec la fonction
   },
 },
});

export const { nomdelafonction } = userSlice.actions;
export default userSlice.reducer;