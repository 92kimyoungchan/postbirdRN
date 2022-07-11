import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import rootReducer from '../slices';
import {NativeModules} from 'react-native';
import {ReducerState} from '../slices/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<ReducerState> = {
  key: 'root', // 이 key는 저장되는 값에 대한 식별자로 반드시 입력해주세요.
  // persist store의 storage로 AsyncStorage를 이용하겠습니다.
  // redux-persist에 내장되어 있는 localstorage 또는 sessionStorage를 import해 사용 할 수도 있습니다.
  // 반드시 storage를 입력해 주어야 합니다.
  storage: AsyncStorage,
  whitelist: ['user'], // persist store에 저장 할 reducer들
  // blacklist: [''], // persist store에 저장하지 않을 reducer들
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: NativeModules.RNConfig.env !== 'prod',
});

const persistor = persistStore(store);

export {store, persistor};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
