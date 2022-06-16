import { Button, Screen, Text, TextInput, View } from "components";
import React, { memo, useEffect } from "react";
import { colorStore } from "stores";
import { signInDemoStore } from "./sign-in.store";
import { styles } from "./styles";

export const SignInScreen = memo(() => {
  const store = signInDemoStore();
  const colors = colorStore().colors;

  useEffect(() => {
    return () => signInDemoStore.getState().reset();
  }, []);

  return (
    <Screen preset="scroll">
      <Text style={styles.title} value="HelloWorld" color={colors.t_03} />
      <View style={styles.contentView}>
        <TextInput
          marginBottom={16}
          labelTx="common.username"
          placeholderTx="common.username"
          value={store.username}
          message={store.msgUsername}
          onChangeText={store.setUsername}
          onSubmitEditing={store.login}
        />
        <TextInput
          marginBottom={16}
          secureTextEntry={true}
          labelTx="common.password"
          placeholderTx="common.password"
          value={store.password}
          message={store.msgPassword}
          onChangeText={store.setPassword}
          onSubmitEditing={store.login}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button preset="transparent" titleTx="common.signUp" onPress={store.goSignUp} />
          <Button preset="transparent" titleTx="common.forgotPassword" onPress={store.goForgotPassword} />
        </View>
        <Button style={styles.btSignIn} titleTx="common.signIn" loading={store.isLoading} onPress={store.login} />
      </View>
    </Screen>
  );
});

SignInScreen.displayName = "SignInScreen";
