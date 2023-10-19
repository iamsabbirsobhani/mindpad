import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  user: {
    email: string;
    id: string;
    picture: string;
  } | null;
}

const initialState: AuthSlice = {
  user: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthSlice['user']>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
