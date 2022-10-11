import {
    CompositeNavigationProp,
    NavigatorScreenParams,
    RouteProp,
  } from '@react-navigation/core';
  import {NativeStackNavigationProp} from '@react-navigation/native-stack';
  
  
  
  export type SignParamList = {
      /**
     * Login: {
      id: number;
    };
     */
    Login: undefined;
    JoinForm: undefined;
    Notice: undefined;
    BirdSetting: undefined;
    PostSetting: undefined;
  };
  
  
  
  
  /* RootStack */
  
  export type SignNavigationScreenParams = NavigatorScreenParams<SignParamList>;
  export type RootStackParamList = {
    SignNavigator: SignNavigationScreenParams;
    //...
    /**
     * PolicyModal: undefined;
     * // 실사용하면서 넣기
    Article: {
      id: number;
    };
     */
  };
  
  ;
  export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  
  
  
  