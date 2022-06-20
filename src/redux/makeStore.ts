import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../slices';
import {NativeModules} from 'react-native';

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: NativeModules.RNConfig.env !== 'prod',
  });
  return store;
};
