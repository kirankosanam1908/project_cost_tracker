import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    dispatch(setUser(user ? { uid: user.uid, email: user.email } : null));
  });
};

export default authSlice.reducer;
