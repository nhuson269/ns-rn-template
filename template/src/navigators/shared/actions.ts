import REGEX from "config/Regex";
import { Linking, Platform } from "react-native";
import navHelper from "./helper";
import { ForgotPasswordDemoParams, SignUpDemoParams, WebParams } from "./params";
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

function navigateToAuthDemo() {
  navHelper.replace(RouteName.AUTH_DEMO_NAV);
}

function navigateToMainDemo() {
  navHelper.replace(RouteName.MAIN_DEMO_NAV);
}

function navigateToSignInDemo() {
  navHelper.navigate(RouteName.AUTH_DEMO_NAV, { screen: RouteName.SIGN_IN_DEMO });
}

function navigateToSignUpDemo(params?: SignUpDemoParams) {
  navHelper.navigate(RouteName.AUTH_DEMO_NAV, { screen: RouteName.SIGN_UP_DEMO, params: params });
}

function navigateToForgotPasswordDemo(params?: ForgotPasswordDemoParams) {
  navHelper.navigate(RouteName.AUTH_DEMO_NAV, { screen: RouteName.FORGOT_PASSWORD_DEMO, params: params });
}

function navigateToTodoListDemo() {
  navHelper.navigate(RouteName.TODO_NAV_DEMO, { screen: RouteName.TODO_LIST_DEMO });
}

const navActions = {
  navigateToWeb,
  navigateToAuthDemo,
  navigateToMainDemo,
  navigateToSignInDemo,
  navigateToSignUpDemo,
  navigateToForgotPasswordDemo,
  navigateToTodoListDemo,
};

export default navActions;
