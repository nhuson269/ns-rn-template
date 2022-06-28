import { FlatList, HeaderNav, Screen, TodoDemoItem } from "components";
import TaskDemoModel from "models/demo/TaskDemoModel";
import React, { memo, useCallback, useEffect } from "react";
import { styles } from "./styles";
import { todoListTypicodeDemoStore } from "./todo-list-typicode.store";

export const TodoListTypicodeDemoScreen = memo(() => {
  const store = todoListTypicodeDemoStore();

  useEffect(() => {
    todoListTypicodeDemoStore.getState().getData();
    return () => todoListTypicodeDemoStore.getState().reset();
  }, []);

  const renderItem = useCallback(({ item }: { item: TaskDemoModel }) => {
    return <TodoDemoItem data={item} marginHorizontal={16} marginBottom={16} />;
  }, []);

  return (
    <>
      <HeaderNav titleTx="todoList.title" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <FlatList
          paddingTop={16}
          data={store.dataDisplay}
          fetching={store.isLoading}
          renderItem={renderItem}
          onRefresh={store.getData}
          onEndReached={store.getDataMore}
        />
      </Screen>
    </>
  );
});

TodoListTypicodeDemoScreen.displayName = "TodoListTypicodeDemoScreen";
