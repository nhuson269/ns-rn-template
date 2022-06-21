import { useRoute } from "@react-navigation/native";
import { Button, HeaderNav, Screen, TextInput } from "components";
import { SignUpParams } from "navigators/shared/params";
import React, { memo, useEffect } from "react";
import { signUpDemoStore } from "./sign-up.store";
import { styles } from "./styles";

export const SignUpScreen = memo(() => {
  const { username } = useRoute().params as SignUpParams;
  const store = signUpDemoStore();

  useEffect(() => {
    return () => signUpDemoStore.getState().reset();
  }, []);

  useEffect(() => {
    if (username) {
      signUpDemoStore.getState().setUsername(username);
    }
  }, [username]);

  return (
    <>
      <HeaderNav titleTx="common.signUp" />
      <Screen style={styles.container} preset="scroll" statusBar="light-content" safe="rl">
        <TextInput
          style={styles.username}
          marginBottom={16}
          labelTx="common.username"
          placeholderTx="common.username"
          value={store.username}
          message={store.msgUsername}
          onChangeText={store.setUsername}
          onSubmitEditing={store.signUp}
        />
        <TextInput
          marginBottom={16}
          labelTx="common.fullname"
          placeholderTx="common.fullname"
          value={store.fullname}
          message={store.msgFullname}
          onChangeText={store.setFullname}
          onSubmitEditing={store.signUp}
        />
        <TextInput
          marginBottom={16}
          secureTextEntry={true}
          labelTx="common.password"
          placeholderTx="common.password"
          value={store.password}
          message={store.msgPassword}
          onChangeText={store.setPassword}
          onSubmitEditing={store.signUp}
        />
        <TextInput
          marginBottom={16}
          secureTextEntry={true}
          labelTx="common.passwordConfirm"
          placeholderTx="common.passwordConfirm"
          value={store.passwordConfirm}
          message={store.msgPasswordConfirm}
          onChangeText={store.setPasswordConfirm}
          onSubmitEditing={store.signUp}
        />
        <Button style={styles.btSignUp} titleTx="common.signUp" loading={store.isLoading} onPress={store.signUp} />
      </Screen>
    </>
  );
});

SignUpScreen.displayName = "SignUpScreen";
