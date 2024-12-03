// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { PURGE } from "reduxjs-toolkit-persist";

interface AppState {
    lang: any;
}

const initialState = {
    lang: 'tr',
} as AppState

const langSlice = createSlice({
    name: 'langPersist',
    initialState,
    reducers: {
        setLang(state, action: PayloadAction<any>){
            state.lang = action.payload
        }
    }
})

export const {
    setLang
} = langSlice.actions;

export default langSlice.reducer