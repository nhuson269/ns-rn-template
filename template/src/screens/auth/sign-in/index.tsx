import { Button, Screen, Text, TextInput } from "components";
import React, { memo, useEffect } from "react";
import { View } from "react-native";
import { signInStore } from "./sign-in.store";
import { styles } from "./styles";

export const SignInScreen = memo(() => {
  const store = signInStore();

  useEffect(() => {
    return () => store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen preset="scroll">
      <Text style={styles.title} value="HelloWorld" />
      <View style={styles.contentView}>
        <TextInput
          style={styles.marginBottom16}
          labelTx="common.usename"
          placeholderTx="common.usename"
          value={store.username}
          message={store.msgUsername}
          onChangeText={store.setUsername}
          onSubmitEditing={store.login}
        />
        <TextInput
          style={styles.marginBottom16}
          labelTx="common.password"
          placeholderTx="common.password"
          value={store.password}
          message={store.msgPassword}
          onChangeText={store.setPassword}
          onSubmitEditing={store.login}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button preset="transparent" titleTx="common.signUp" onPress={store.goSignUp} />
          <Button preset="transparent" titleTx="common.signIn" onPress={store.goForgotPassword} />
        </View>
        <Button style={styles.btSignIn} titleTx="common.signIn" loading={store.isLoading} onPress={store.login} />
      </View>
    </Screen>
  );
});
