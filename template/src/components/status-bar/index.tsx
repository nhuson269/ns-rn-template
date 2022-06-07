import React, { memo, useCallback } from "react";
import { StatusBar } from "react-native";
import { statusBarStore } from "stores";

export const StatusBarView = memo(() => {
  const barStyle = statusBarStore(useCallback(state => state.style, []));
  return <StatusBar animated translucent backgroundColor="transparent" barStyle={barStyle} />;
});
