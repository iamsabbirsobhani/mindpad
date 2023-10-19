import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataSlice {
  data: any;
}

const initialState: DataSlice = {
  data: null,
};

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataSlice['data']>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = DataSlice.actions;

export default DataSlice.reducer;
