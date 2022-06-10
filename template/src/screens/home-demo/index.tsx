import { Screen } from "components";
import React, { memo } from "react";
import { Text } from "react-native";
import { styles } from "./styles";

export const HomeScreen = memo(() => {
  return (
    <Screen style={styles.container}>
      <Text>HelloWorld</Text>
    </Screen>
  );
});

HomeScreen.displayName = "HomeScreen";
