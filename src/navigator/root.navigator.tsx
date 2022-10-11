/*
작성자: 홍준택
사용: 루트 내비게이터
*/
import React, {useCallback, useEffect} from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import SignNavigator from "./sign.navigator";
import MainNavigator from "./main.navigator";
import NoTabNavigator from "./noTab.navigator";
import { useSign } from "../hooks/useSelector";



const Stack = createStackNavigator();

const RootNavigator = () => {
  const isSign = useSign();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      mode={"modal"}>
      {!isSign ? (
        <>
          <Stack.Screen name="Sign" component={SignNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen name={"NoTab"} component={NoTabNavigator} options={{ cardOverlayEnabled: true }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
