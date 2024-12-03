import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'reduxjs-toolkit-persist';

interface AppState {
  user: any;
  isFirstTime: any;
}

const initialState = {
  user: null,
  isFirstTime: true,
} as AppState;

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    clearPersistSlice() {
      return initialState;
    },

    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },

    logoutUser(state, action: PayloadAction<any>) {
      return initialState;
    },

    setIsFirstTime(state, action: PayloadAction<any>) {
      state.isFirstTime = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      AsyncStorage.removeItem('persist:root');
    });
  },
});

export const {clearPersistSlice, setUser, logoutUser, setIsFirstTime} =
  persistSlice.actions;

export default persistSlice.reducer;
