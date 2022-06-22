import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthDemoNavigator, MainDemoNavigator } from "navigators";
import { navigationRef, navOnStateChange } from "navigators/shared/helper";
import { RouteName } from "navigators/shared/routes";
import { LaunchScreen } from "screens";

export type RootNavParamList = {
  [RouteName.LAUNCH]: undefined;
  [RouteName.AUTH_NAV_DEMO]: undefined;
  [RouteName.MAIN_NAV_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<RootNavParamList>();

export const RootNavigator = () => {
  useEffect(() => {
    // SETUP NOTIFICATION
    // notificationService.register();
    // return () => notificationService.unregister();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={navOnStateChange}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteName.LAUNCH} component={LaunchScreen} />
        <Stack.Screen name={RouteName.AUTH_NAV_DEMO} component={AuthDemoNavigator} />
        <Stack.Screen name={RouteName.MAIN_NAV_DEMO} component={MainDemoNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

RootNavigator.displayName = "RootNavigator";
