import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { ForgotPasswordScreen, SignInScreen, SignUpScreen } from "screens";

export type AuthNavParamList = {
  [RouteName.SIGN_IN_DEMO]: undefined;
  [RouteName.SIGN_UP_DEMO]: undefined;
  [RouteName.FORGOT_PASSWORD_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<AuthNavParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.SIGN_IN_DEMO} component={SignInScreen} />
      <Stack.Screen name={RouteName.SIGN_UP_DEMO} component={SignUpScreen} />
      <Stack.Screen name={RouteName.FORGOT_PASSWORD_DEMO} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

AuthNavigator.displayName = "AuthNavigator";
