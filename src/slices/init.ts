import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Init {
  /** 내부저장소로 실제 사용할 값 */
  themeScheme: string;
  language: string;
}



const initialState: Init = {
  themeScheme: 'dark' || 'light' || 'system',
  language: 'eng' || 'kr',
};

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    init(state: Init, action: PayloadAction<Init>) {
      state.themeScheme = action.payload.themeScheme;
      state.language = action.payload.language;
    },
    initialize() {
      return initialState;
    },
  },
});

export default initSlice.reducer;
export const {authorize, logout} = initSlice.actions;
