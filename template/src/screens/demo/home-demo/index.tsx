import { HeaderNav, Pressable, Screen, Text, View } from "components";
import React, { memo } from "react";
import { colorDemoStore } from "stores";
import { homeDemoStore } from "./home-demo.store";
import { styles } from "./styles";

export const HomeDemoScreen = memo(() => {
  const store = homeDemoStore();
  const colors = colorDemoStore().colors;
  const todoContainer = [styles.todoContainer, { backgroundColor: colors.t_03 }];

  return (
    <>
      <HeaderNav isLeftView={false} titleTx="tabbar.home" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <View flexRow>
          <Pressable style={todoContainer} marginRight={16} onPress={store.goTodoListHerokuapp}>
            <Text style={styles.todoTitle} color={colors.t_01} value={`Todo\nApi Herokuapp`} />
          </Pressable>
          <Pressable style={todoContainer} onPress={store.goTodoListTypicode}>
            <Text style={styles.todoTitle} color={colors.t_01} value={`Todo\nApi Typicode`} />
          </Pressable>
        </View>
      </Screen>
    </>
  );
});

HomeDemoScreen.displayName = "HomeDemoScreen";
