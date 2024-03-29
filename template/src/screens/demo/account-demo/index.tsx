import {Button, HeaderNav, Screen, Text, View} from 'components';
import React, {memo, useEffect, useMemo} from 'react';
import {userDemoStore} from 'stores';
import {accountDemoStore} from './account-demo.store';
import {styles} from './styles';

export const AccountDemoScreen = memo(() => {
  const stores = accountDemoStore();
  const user = userDemoStore(state => state.user);

  useEffect(() => {
    return () => accountDemoStore.getState().reset();
  }, []);

  const userInfoView = useMemo(() => {
    return user === undefined ? null : (
      <>
        <Text valueTx="common.fullname">
          {': '}
          <Text value={user.name} />
        </Text>
        <Text marginTop={6}>
          {'Email: '}
          <Text value={user.email} />
        </Text>
      </>
    );
  }, [user]);

  return (
    <>
      <HeaderNav isLeftView={false} titleTx="tabbar.settings" />
      <Screen safe="rl" statusBar="light-content" style={styles.container}>
        {userInfoView}
        <Text valueTx="common.theme" marginTop={20} marginBottom={8} />
        <View flexRow>
          <Button
            titleTx="common.green"
            marginRight={16}
            backgroundColor="green"
            onPress={stores.setThemeGreen}
          />
          <Button
            titleTx="common.violet"
            marginRight={16}
            backgroundColor="violet"
            onPress={stores.setThemeViolet}
          />
          <Button
            titleTx="common.blue"
            backgroundColor="blue"
            onPress={stores.setThemeBlue}
          />
        </View>
        <Text valueTx="common.language" marginTop={16} marginBottom={8} />
        <View flexRow>
          <Button
            titleTx="common.english"
            marginRight={16}
            onPress={stores.setEnglist}
          />
          <Button titleTx="common.vietnamese" onPress={stores.setVietnamese} />
        </View>
        <Button
          titleTx="common.logout"
          marginTop={32}
          onPress={stores.logout}
        />
      </Screen>
    </>
  );
});

AccountDemoScreen.displayName = 'AccountDemoScreen';
