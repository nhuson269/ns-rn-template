import React, { memo } from "react";
import { StatusBar as RNStatusBar } from "react-native";
import { useStatusBarStore } from "stores";

export const StatusBar = memo(() => {
  const style = useStatusBarStore().style;
  return <RNStatusBar animated barStyle={style} />;
});
