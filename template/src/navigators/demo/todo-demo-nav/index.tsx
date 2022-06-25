import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { TodoDetailDemoScreen, TodoListDemoScreen, TodoListTypicodeDemoScreen } from "screens";
import { TodoListDemoParams } from "navigators/shared";

export type TodoDemoNavParamList = {
  [RouteName.TODO_LIST_DEMO]: TodoListDemoParams;
  [RouteName.TODO_LIST_TYPICODE_DEMO]: undefined;
  [RouteName.TODO_DETAIL_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<TodoDemoNavParamList>();

export const TodoDemoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.TODO_LIST_DEMO} component={TodoListDemoScreen} />
      <Stack.Screen name={RouteName.TODO_LIST_TYPICODE_DEMO} component={TodoListTypicodeDemoScreen} />
      <Stack.Screen name={RouteName.TODO_DETAIL_DEMO} component={TodoDetailDemoScreen} />
    </Stack.Navigator>
  );
};

TodoDemoNavigator.displayName = "TodoDemoNavigator";
