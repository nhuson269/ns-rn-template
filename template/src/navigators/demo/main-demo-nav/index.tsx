import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { TabbarDemoNavigator } from "../tabbar-demo-nav";
import { TodoDemoNavigator } from "../todo-demo-nav";

export type MainDemoNavParamList = {
  [RouteName.TABBAR_DEMO]: undefined;
  [RouteName.TODO_NAV_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<MainDemoNavParamList>();

export const MainDemoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.TABBAR_DEMO} component={TabbarDemoNavigator} />
      <Stack.Screen name={RouteName.TODO_NAV_DEMO} component={TodoDemoNavigator} />
    </Stack.Navigator>
  );
};

MainDemoNavigator.displayName = "MainDemoNavigator";
