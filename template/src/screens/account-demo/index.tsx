import { Button, HeaderNav, Screen, Text, View } from "components";
import i18next from "i18next";
import React, { memo } from "react";
import { styles } from "./styles";

export const AccountScreen = memo(() => {
  return (
    <>
      <HeaderNav isLeftView={false} titleTx="tabbar.settings" />
      <Screen style={styles.container} statusBar="light-content" safe="rl">
        <Text valueTx="common.theme" marginBottom={8} />
        <View flexRow>
          <Button titleTx="common.dark" marginRight={16} />
          <Button titleTx="common.light" />
        </View>
        <Text valueTx="common.language" marginTop={16} marginBottom={8} />
        <View flexRow>
          <Button titleTx="common.english" marginRight={16} onPress={() => i18next.changeLanguage("en")} />
          <Button titleTx="common.vietnamese" onPress={() => i18next.changeLanguage("vi")} />
        </View>
      </Screen>
    </>
  );
});

AccountScreen.displayName = "AccountScreen";
