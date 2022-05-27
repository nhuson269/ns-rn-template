import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LaunchScreen } from "screens";
import { AuthNavigator, HomeNavigator } from "navigators";
import { RouteName } from "config";

export type RootNavParamList = {
  [RouteName.LAUNCH]: undefined;
  [RouteName.AUTH]: undefined;
  [RouteName.MAIN]: undefined;
};

const Stack = createNativeStackNavigator<RootNavParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={RouteName.LAUNCH} component={LaunchScreen} />
        <Stack.Screen name={RouteName.AUTH} component={AuthNavigator} />
        <Stack.Screen name={RouteName.MAIN} component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

RootNavigator.displayName = "RootNavigator";
