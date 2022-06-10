import { Button, HeaderNav, Screen, TextInput } from "components";
import React, { memo, useEffect } from "react";
import { forgotPasswordStore } from "./forgot-password.store";
import { styles } from "./styles";

export const ForgotPasswordScreen = memo(() => {
  const store = forgotPasswordStore();

  useEffect(() => {
    return () => forgotPasswordStore.getState().reset();
  }, []);

  return (
    <>
      <HeaderNav titleTx="common.forgotPassword" />
      <Screen style={styles.container} preset="scroll" statusBar="light-content">
        <TextInput
          style={styles.marginBottom16}
          labelTx="common.username"
          placeholderTx="common.username"
          value={store.username}
          message={store.msgUsername}
          onChangeText={store.setUsername}
          onSubmitEditing={store.goConfirm}
        />
        <Button style={styles.btConfirm} titleTx="common.confirm" loading={store.isLoading} onPress={store.goConfirm} />
      </Screen>
    </>
  );
});

ForgotPasswordScreen.displayName = "ForgotPasswordScreen";
