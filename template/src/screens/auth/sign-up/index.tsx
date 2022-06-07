import { Screen, Text } from "components";
import React, { memo } from "react";
import { styles } from "./styles";

export const SignUpScreen = memo(() => {
  return (
    <Screen style={styles.container}>
      <Text value="HelloWorld" />
    </Screen>
  );
});
