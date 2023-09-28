import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  count: number;
  selectedPad: {
    id: number;
    color: string;
    hover: string;
  } | null;
}

const initialState: UiState = {
  count: 80,
  selectedPad: null,
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

    setSelectedPad: (
      state: {
        selectedPad: { id: number; color: string; hover: string } | null;
      },
      action: PayloadAction<{
        id: number;
        color: string;
        hover: string;
      } | null>,
    ) => {
      state.selectedPad = action.payload;
    },
  },
});

export const { countUp, setCount, setSelectedPad } = uiSlice.actions;

export default uiSlice.reducer;
