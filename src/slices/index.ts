import {combineReducers} from 'redux';
import user from './user';

const rootReducer = combineReducers({
  user,
});

// rootReducer 함수의 반환값 타입을 RootState type alias로 지정
// 이거 책에서 확인가능 타입스크립트 도와주는 친구임
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
