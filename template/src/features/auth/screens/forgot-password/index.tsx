import {Button, HeaderNav, Screen, TextInput} from 'components';
import React, {memo, useEffect} from 'react';
import {forgotPasswordDemoStore} from './forgot-password.store';
import {styles} from './styles';

export const ForgotPasswordDemoScreen = memo(() => {
  const store = forgotPasswordDemoStore();

  useEffect(() => {
    return () => forgotPasswordDemoStore.getState().reset();
  }, []);

  return (
    <>
      <HeaderNav titleTx="common.forgotPassword" />
      <Screen
        statusBar="light-content"
        safe="rl"
        preset="scroll"
        style={styles.container}>
        <TextInput
          style={styles.username}
          marginBottom={16}
          labelTx="common.username"
          placeholderTx="common.username"
          value={store.username}
          message={store.msgUsername}
          onChangeText={store.setUsername}
          onSubmitEditing={store.goConfirm}
        />
        <Button
          style={styles.btConfirm}
          titleTx="common.confirm"
          loading={store.isLoading}
          onPress={store.goConfirm}
        />
      </Screen>
    </>
  );
});

ForgotPasswordDemoScreen.displayName = 'ForgotPasswordDemoScreen';
