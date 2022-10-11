import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Sign {
  /** 내부저장소로 실제 사용할 값 */
  isSign: boolean;
}



const initialState: Sign = {
    isSign: false,
};

const initSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    setSignInfo(state: Sign, action: PayloadAction<Sign>) {
      state.isSign = action.payload.isSign;
    },
    initSignInfo() {
      return initialState;
    },
  },
});

export default initSlice.reducer;
export const {setSignInfo, initSignInfo} = initSlice.actions;
