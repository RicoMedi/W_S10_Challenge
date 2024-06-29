import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    size: 'All',
  },
  reducers: {
    setSize: (state, action) => {
      state.size = action.payload;
    },
    
  },
});
//actions are payloads of information that send data from your application to your store
export const { setSize } = filterSlice.actions;
// selectors are functions that take the Redux state and return some data that we are interested in
export const selectSize = (state) => state.filter.size;
//reducers specify how the application's state changes in response to actions sent to the store
export default filterSlice.reducer;