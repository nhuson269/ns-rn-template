import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "screens";
import { RouteName } from "config";

export type HomeNavParamList = {
  [RouteName.HOME]: undefined;
};

const Stack = createNativeStackNavigator<HomeNavParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteName.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

HomeNavigator.displayName = "HomeNavigator";
