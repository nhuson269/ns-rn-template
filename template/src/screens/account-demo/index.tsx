import { Button, HeaderNav, Screen, Text, View } from "components";
import React, { memo } from "react";
import { accoutDemoStore } from "./account-demo.store";
import { styles } from "./styles";

export const AccountScreen = memo(() => {
  const stores = accoutDemoStore();

  return (
    <>
      <HeaderNav isLeftView={false} titleTx="tabbar.settings" />
      <Screen style={styles.container} statusBar="light-content" safe="rl">
        <Text valueTx="common.theme" marginBottom={8} />
        <View flexRow>
          <Button titleTx="common.green" marginRight={16} backgroundColor="green" onPress={stores.setThemeGreen} />
          <Button titleTx="common.violet" marginRight={16} backgroundColor="violet" onPress={stores.setThemeViolet} />
          <Button titleTx="common.blue" backgroundColor="blue" onPress={stores.setThemeBlue} />
        </View>
        <Text valueTx="common.language" marginTop={16} marginBottom={8} />
        <View flexRow>
          <Button titleTx="common.english" marginRight={16} onPress={stores.setEnglist} />
          <Button titleTx="common.vietnamese" onPress={stores.setVietnamese} />
        </View>
        <Button titleTx="common.logout" marginTop={32} onPress={stores.logout} />
      </Screen>
    </>
  );
});

AccountScreen.displayName = "AccountScreen";
