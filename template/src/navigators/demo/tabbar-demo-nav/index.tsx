import React from "react";
import { RouteName } from "navigators/shared/routes";
import { AccountDemoScreen, HomeDemoScreen } from "screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View } from "components";
import { colorDemoStore } from "stores";

export type TabbarNavParamList = {
  [RouteName.HOME_DEMO]: undefined;
  [RouteName.ACCOUNT_DEMO]: undefined;
};

const Tabbar = createBottomTabNavigator<TabbarNavParamList>();

export const TabbarDemoNavigator = () => {
  const colors = colorDemoStore().colors;

  return (
    <Tabbar.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.t_03 }}>
      <Tabbar.Screen
        name={RouteName.HOME_DEMO}
        component={HomeDemoScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <View center>
              <Icons name="home" size={size} color={color} />
              <Text valueTx="tabbar.home" size={12} color={color} />
            </View>
          ),
        }}
      />
      <Tabbar.Screen
        name={RouteName.ACCOUNT_DEMO}
        component={AccountDemoScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <View center>
              <Icons name="account" size={size} color={color} />
              <Text valueTx="tabbar.settings" size={12} color={color} />
            </View>
          ),
        }}
      />
    </Tabbar.Navigator>
  );
};

TabbarDemoNavigator.displayName = "TabbarDemoNavigator";
