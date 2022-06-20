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

export interface UserState {
  user: User | null;
}
const initialState: UserState = {
  user: {
    nickname: '',
    addressInfo: {
      address: '',
      addressDetail: '',
      postcode: '',
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {authorize, logout} = userSlice.actions;
