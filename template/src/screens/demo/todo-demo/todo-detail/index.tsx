import { HeaderNav, Pressable, Screen, Text, View } from "components";
import React, { memo } from "react";
import { colorDemoStore } from "stores";
import { styles } from "./styles";

export const TodoDetailDemoScreen = memo(() => {
  const colors = colorDemoStore().colors;
  const todoContainer = [styles.todoContainer, { backgroundColor: colors.t_03 }];

  return (
    <>
      <HeaderNav titleTx="todoDetail.title" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <View flexRow>
          <Pressable style={todoContainer} marginRight={16}>
            <Text style={styles.todoTitle} color={colors.t_01} value={`Todo\nApi Herokuapp`} />
          </Pressable>
          <Pressable style={todoContainer}>
            <Text style={styles.todoTitle} color={colors.t_01} value={`Todo\nApi Typicode`} />
          </Pressable>
        </View>
      </Screen>
    </>
  );
});

TodoDetailDemoScreen.displayName = "TodoDetailDemoScreen";
