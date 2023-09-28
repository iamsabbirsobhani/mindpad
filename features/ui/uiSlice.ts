import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  count: number;
}

const initialState: UiState = {
  count: 80,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    countUp: (state: { count: number }) => {
      state.count++;
    },

    setCount: (state: { count: number }, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { countUp, setCount } = uiSlice.actions;

export default uiSlice.reducer;
