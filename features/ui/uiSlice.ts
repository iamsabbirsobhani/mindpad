import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  count: number;
  selectedPad: {
    id: number;
    color: string;
    hover: string;
  } | null;
  spaceUsed: any;
  quillValue: any;
  isQuillOpen: boolean;
}

const initialState: UiState = {
  count: 80,
  selectedPad: null,
  spaceUsed: 0,
  quillValue: '',
  isQuillOpen: false,
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

    setSpaceUsed: (state: { spaceUsed: any }, action: PayloadAction<any>) => {
      state.spaceUsed = action.payload;
    },

    setQuillValue: (state: { quillValue: any }, action: PayloadAction<any>) => {
      state.quillValue = action.payload;
    },

    setIsQuillOpen: (
      state: { isQuillOpen: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.isQuillOpen = action.payload;
    },
  },
});

export const {
  countUp,
  setCount,
  setSelectedPad,
  setSpaceUsed,
  setQuillValue,
  setIsQuillOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
