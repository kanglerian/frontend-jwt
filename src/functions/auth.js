import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem('token');

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: token
  },
  reducers: {
    increment: (state, action) => {
      state.value = action.payload
      localStorage.setItem('token', action.payload);
    },
    decrement: (state) => {
      state.value = null
      token = null;
    },
  }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;