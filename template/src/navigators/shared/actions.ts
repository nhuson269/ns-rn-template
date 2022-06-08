import REGEX from "config/Regex";
import { Linking, Platform } from "react-native";
import navHelper from "./helper";
import { ForgotPasswordParams, SignUpParams, WebParams } from "./params";
import { RouteName } from "./routes";

function navigateToWeb(params: WebParams) {
  const url = params.url;
  if (typeof url !== "string") {
    return;
  }
  if (url.startsWith("http")) {
    return __DEV__ ? navHelper.navigate(RouteName.WEB, { url: url }) : Linking.openURL(url);
  }
  if (REGEX.EMAIL.test(url)) {
    return Linking.openURL(`mailto:${url}`);
  }
  if (url.startsWith("0") || url.startsWith("+")) {
    return Linking.openURL(`tel:${url}`);
  }
  return Linking.openURL(
    `${Platform.select({
      ios: `maps:0,0?q=${url}`,
      android: `geo:0,0?q=${url}`,
    })}`,
  );
}

function navigateToAuth() {
  navHelper.replace(RouteName.AUTH_DEMO);
}

function navigateToMain() {
  navHelper.replace(RouteName.MAIN_DEMO);
}

function navigateToSignIn() {
  navHelper.navigate(RouteName.AUTH_DEMO, { screen: RouteName.SIGN_IN_DEMO });
}

function navigateToSignUp(params?: SignUpParams) {
  navHelper.navigate(RouteName.AUTH_DEMO, { screen: RouteName.SIGN_UP_DEMO, params: params });
}

function navigateToForgotPassword(params?: ForgotPasswordParams) {
  navHelper.navigate(RouteName.AUTH_DEMO, { screen: RouteName.FORGOT_PASSWORD_DEMO, params: params });
}

const navActions = {
  navigateToWeb,
  navigateToAuth,
  navigateToMain,
  navigateToSignIn,
  navigateToSignUp,
  navigateToForgotPassword,
};

export default navActions;
