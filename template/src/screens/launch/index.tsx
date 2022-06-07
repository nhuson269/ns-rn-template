import { useIsFocused } from "@react-navigation/native";
import { Screen, Text } from "components";
import React, { memo, useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { userStore } from "stores";
import { styles } from "./styles";

export const LaunchScreen = memo(() => {
  const isLoading = userStore(useCallback(state => state.isLoading, []));
  const isFocused = useIsFocused();
  const { bottom } = useSafeAreaInsets();
  const indicatorBottom = bottom > 0 ? bottom : 16;

  useEffect(() => {
    if (isFocused) {
      userStore.getState().getProfile(true);
    }
  }, [isFocused]);

  return (
    <Screen safe="full" statusBar="light-content" style={styles.container}>
      <Text style={styles.title} value="HelloWorld" />
      <ActivityIndicator
        style={[styles.activity, { bottom: indicatorBottom }]}
        size="large"
        color="green"
        animating={isLoading}
      />
    </Screen>
  );
});
