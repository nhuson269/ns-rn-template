import { useRoute } from "@react-navigation/native";
import { FlatList, HeaderNav, Screen, TodoDemoItem } from "components";
import TaskDemoModel from "models/demo/TaskDemoModel";
import { TodoListDemoParams } from "navigators";
import React, { memo, useCallback, useEffect } from "react";
import { styles } from "./styles";
import { todoListDemoStore } from "./todo-list.store";

export const TodoListDemoScreen = memo(() => {
  const params = useRoute().params as TodoListDemoParams;
  const store = todoListDemoStore();

  useEffect(() => {
    todoListDemoStore.setState({ params: params });
  }, [params]);

  useEffect(() => {
    todoListDemoStore.getState().getData();
    return () => todoListDemoStore.getState().reset();
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
          data={store.data}
          fetching={store.isLoading}
          fetchingMore={store.isLoadingMore}
          renderItem={renderItem}
          onRefresh={store.getData}
          onEndReached={store.getDataMore}
        />
      </Screen>
    </>
  );
});

TodoListDemoScreen.displayName = "TodoListDemoScreen";
