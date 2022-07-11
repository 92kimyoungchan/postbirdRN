/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useColorScheme, Text} from 'react-native';
import { store, persistor } from '/store';
import {setSiblingWrapper, RootSiblingParent} from 'react-native-root-siblings';
import {enableScreens} from 'react-native-screens';
import {darkTheme, lightTheme} from './src/theme/themeType';
import {QueryClientProvider, QueryClient} from 'react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {makeStore} from './src/redux';
import {NavigationContainer} from '@react-navigation/native';

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    colors: {
      background: string;
      border: string;
      card: string;
      notification: string;
      primary: string;
      text: string;
      testParam: string;
    };
    dark: boolean;
  };
  export function useTheme(): ExtendedTheme;
}
const LoadingView = () => <Text>Loading...</Text>

export default function App() {
  enableScreens();
  const queryClient = new QueryClient();
  const navigationRef: React.RefObject<any> = useRef(null);
  const scheme = useColorScheme();
  /*
  쓰고 싶은 하위 페이지에서
  const {colors, dark} = useTheme();
  */
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <PersistGate loading={LoadingView} persistor={persistor}>
            <NavigationContainer
              theme={scheme === 'dark' ? darkTheme : lightTheme}
              ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
            </PersistGate>
          </ReduxProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
