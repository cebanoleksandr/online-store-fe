import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../utils/interfaces';

interface ProfileState {
  profile: IUser | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileAC: (state, action: { payload: IUser }) => {
      state.profile = action.payload;
    },
    removeProfileAC: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfileAC, removeProfileAC } = profileSlice.actions;
export default profileSlice.reducer;
