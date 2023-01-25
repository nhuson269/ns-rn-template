import {useRoute} from '@react-navigation/native';
import {FlashList, HeaderNav, Screen, Text, TodoDemoItem} from 'components';
import TaskDemoModel from 'models/demo/TaskDemoModel';
import {TodoListDemoParams} from 'navigators';
import React, {memo, useCallback, useEffect} from 'react';
import {styles} from './styles';
import {todoListDemoStore} from './todo-list.store';

export const TodoListDemoScreen = memo(() => {
  const params = useRoute().params as TodoListDemoParams;
  const store = todoListDemoStore();

  useEffect(() => {
    todoListDemoStore.setState({params: params});
  }, [params]);

  useEffect(() => {
    todoListDemoStore.getState().getData();
    return () => todoListDemoStore.getState().reset();
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
        <FlashList
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

TodoListDemoScreen.displayName = 'TodoListDemoScreen';
