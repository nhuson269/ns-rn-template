import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "navigators/shared/routes";
import { TodoDetailDemoScreen, TodoListDemoScreen } from "screens";

export type TodoDemoNavParamList = {
  [RouteName.TODO_LIST_HEROKUAPP_DEMO]: undefined;
  [RouteName.TODO_DETAIL_HEROKUAPP_DEMO]: undefined;
};

const Stack = createNativeStackNavigator<TodoDemoNavParamList>();

export const TodoDemoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.TODO_LIST_HEROKUAPP_DEMO} component={TodoListDemoScreen} />
      <Stack.Screen name={RouteName.TODO_DETAIL_HEROKUAPP_DEMO} component={TodoDetailDemoScreen} />
    </Stack.Navigator>
  );
};

TodoDemoNavigator.displayName = "TodoDemoNavigator";
