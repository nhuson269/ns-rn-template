import {FlatList, HeaderNav, Screen, Text, TodoDemoItem} from 'components';
import TaskDemoModel from 'models/demo/TaskDemoModel';
import React, {memo, useCallback, useEffect} from 'react';
import {styles} from './styles';
import {todoListTypicodeDemoStore} from './todo-list-typicode.store';

export const TodoListTypicodeDemoScreen = memo(() => {
  const store = todoListTypicodeDemoStore();

  useEffect(() => {
    todoListTypicodeDemoStore.getState().getData();
    return () => todoListTypicodeDemoStore.getState().reset();
  }, []);

  const keyExtractor = useCallback((item: TaskDemoModel) => {
    return item.id.toString();
  }, []);

  const renderItem = useCallback(({item}: {item: TaskDemoModel}) => {
    return <TodoDemoItem data={item} marginHorizontal={16} marginBottom={16} />;
  }, []);

  return (
    <>
      <HeaderNav titleTx="todoList.title" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <Text
          marginHorizontal={16}
          marginVertical={8}
          valueTx="todoList.length">{`: ${store.data.length}`}</Text>
        <FlatList
          paddingTop={16}
          data={store.dataDisplay}
          keyExtractor={keyExtractor}
          fetching={store.isLoading}
          renderItem={renderItem}
          onRefresh={store.getData}
          onEndReached={store.getDataMore}
        />
      </Screen>
    </>
  );
});

TodoListTypicodeDemoScreen.displayName = 'TodoListTypicodeDemoScreen';
