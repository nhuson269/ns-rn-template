import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NavigationContainerRef, ParamListBase, StackActions, TabActions } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { RouteName } from "config";
import { createRef } from "react";
import { Keyboard } from "react-native";
import { analyticsService } from "services";

let previousRouteName: string | undefined;

export const navigationRef = createRef<NavigationContainerRef<ParamListBase>>();

function getRef(hideKeyboard?: boolean) {
  hideKeyboard && Keyboard.dismiss();
  return navigationRef.current;
}

function getRoute() {
  return getRef()?.getCurrentRoute();
}

function goBack() {
  getRef()?.canGoBack() && getRef(true)?.goBack();
}

function pop(count = 1) {
  getRef(true)?.dispatch(StackActions.pop(count));
}

function popToTop() {
  getRef()?.canGoBack() && getRef(true)?.dispatch(StackActions.popToTop());
}

function reset(name: RouteName, params?: { [key: string]: object | undefined }) {
  getRef(true)?.reset({ index: 1, routes: [{ name, params }] });
}

function navigate(routeName: RouteName, params?: { [key: string]: object | undefined }) {
  getRef(true)?.navigate(routeName, params);
}

function push(routeName: RouteName, params?: { [key: string]: object | undefined }) {
  getRef(true)?.dispatch(StackActions.push(routeName, params));
}

function replace(routeName: RouteName, params?: { [key: string]: object | undefined }) {
  getRef(true)?.dispatch(StackActions.replace(routeName, params));
}

function jumpTo(screen: RouteName) {
  getRef(true)?.dispatch(TabActions.jumpTo(screen));
}

export function navOnStateChange() {
  const currentRoute = getRoute();
  if (currentRoute?.name && previousRouteName !== currentRoute.name) {
    analyticsService.logScreenView(currentRoute.name, currentRoute.params);
  }
  previousRouteName = currentRoute?.name;
}

export const StackOption: NativeStackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
  animationTypeForReplace: "push",
};

export const ModalPresentationOption: NativeStackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerShown: false,
  animationTypeForReplace: "push",
};

export const ModalSlideOption: NativeStackNavigationOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerShown: false,
  gestureEnabled: false,
  animationTypeForReplace: "push",
};

export const TabOption: BottomTabNavigationOptions = {
  headerShown: false,
};

export const DisableGestureOption: any = {
  gestureEnabled: false,
};

const NavigationHelper = {
  getRef,
  getRoute,
  goBack,
  pop,
  popToTop,
  reset,
  navigate,
  push,
  replace,
  jumpTo,
};

export default NavigationHelper;
