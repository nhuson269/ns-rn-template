import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { HomeScreen } from "screens";

export type HomeNavParamList = {
  [RouteName.HOME]: undefined;
};

const Stack = createNativeStackNavigator<HomeNavParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

HomeNavigator.displayName = "HomeNavigator";
