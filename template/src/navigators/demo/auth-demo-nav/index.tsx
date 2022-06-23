import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { ForgotPasswordDemoScreen, SignInDemoScreen, SignUpDemoScreen } from "screens";
import { ForgotPasswordDemoParams, SignUpDemoParams } from "navigators/shared/params";

export type AuthDemoNavParamList = {
  [RouteName.SIGN_IN_DEMO]: undefined;
  [RouteName.SIGN_UP_DEMO]: SignUpDemoParams;
  [RouteName.FORGOT_PASSWORD_DEMO]: ForgotPasswordDemoParams;
};

const Stack = createNativeStackNavigator<AuthDemoNavParamList>();

export const AuthDemoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.SIGN_IN_DEMO} component={SignInDemoScreen} />
      <Stack.Screen name={RouteName.SIGN_UP_DEMO} component={SignUpDemoScreen} />
      <Stack.Screen name={RouteName.FORGOT_PASSWORD_DEMO} component={ForgotPasswordDemoScreen} />
    </Stack.Navigator>
  );
};

AuthDemoNavigator.displayName = "AuthDemoNavigator";
