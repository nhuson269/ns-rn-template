import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { ForgotPasswordScreen, SignInScreen, SignUpScreen } from "screens";

export type AuthNavParamList = {
  [RouteName.SIGN_IN]: undefined;
  [RouteName.SIGN_UP]: undefined;
  [RouteName.FORGOT_PASSWORD]: undefined;
};

const Stack = createNativeStackNavigator<AuthNavParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={RouteName.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={RouteName.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

AuthNavigator.displayName = "AuthNavigator";
