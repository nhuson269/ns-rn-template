import { Button, HeaderNav, Screen, Text, View } from "components";
import React, { memo, useEffect, useMemo } from "react";
import { userStore } from "stores";
import { accoutDemoStore } from "./account-demo.store";
import { styles } from "./styles";

export const AccountScreen = memo(() => {
  const stores = accoutDemoStore();

  useEffect(() => {
    return () => accoutDemoStore.getState().reset();
  }, []);

  const userInfoView = useMemo(() => {
    const user = userStore(state => state.user);
    return user === undefined ? null : (
      <>
        <Text valueTx="common.fullname" marginTop={6}>
          {": "}
          <Text value={user.name} />
        </Text>
        <Text value="Email: " marginTop={6}>
          <Text value={user.email} />
        </Text>
      </>
    );
  }, []);

  return (
    <>
      <HeaderNav isLeftView={false} titleTx="tabbar.settings" />
      <Screen style={styles.container} statusBar="light-content" safe="rl">
        {userInfoView}
        <Text valueTx="common.theme" marginTop={20} marginBottom={8} />
        <View flexRow skeleton>
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
