import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  /** 내부저장소로 실제 사용할 값 */
  nickname: string;
  addressInfo: addressInfo;
}

interface addressInfo {
  address: string;
  addressDetail: string;
  postcode: string;
}


const initialState: User = {
    nickname: '',
    addressInfo: {
      address: '',
      addressDetail: '',
      postcode: '',
    },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorize(state: User, action: PayloadAction<User>) {
      state.nickname = action.payload.nickname;
      state.addressInfo = action.payload.addressInfo;
    },
    logout() {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {authorize, logout} = userSlice.actions;
