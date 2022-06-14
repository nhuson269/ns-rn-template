import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { TabbarNavigator } from "navigators/tabbar-demo-nav";

export type MainNavParamList = {
  [RouteName.TABBAR_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<MainNavParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.TABBAR_DEMO} component={TabbarNavigator} />
    </Stack.Navigator>
  );
};

MainNavigator.displayName = "MainNavigator";
