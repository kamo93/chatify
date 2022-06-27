import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  email: string;
  username: string;
  isLogin: boolean;
};

const userInitialState: User = {
  id: '',
  email: '',
  username: '',
  isLogin: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state = {
        ...state,
        ...action.payload,
        isLogin: true
      };
    },
    remove: state => {
      state = userInitialState;
    },
  },
});

export const { set, remove } = userSlice.actions;

export default userSlice.reducer;
