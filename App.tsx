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
import {useColorScheme} from 'react-native';

import {setSiblingWrapper, RootSiblingParent} from 'react-native-root-siblings';
import {enableScreens} from 'react-native-screens';
import {darkTheme, lightTheme} from './src/theme/themeType';
import {QueryClientProvider, QueryClient} from 'react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
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

export default function App() {
  enableScreens();
  const store = makeStore();
  const queryClient = new QueryClient();
  const navigationRef: React.RefObject<any> = useRef(null);
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(
    scheme === 'dark' ? darkTheme : lightTheme,
  );
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
            <NavigationContainer theme={theme} ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </ReduxProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
