import React from "react";
import { RouteName } from "navigators/shared/routes";
import { AccountScreen, HomeScreen } from "screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

export type TabbarNavParamList = {
  [RouteName.HOME_DEMO]: undefined;
  [RouteName.ACCOUNT_DEMO]: undefined;
};

const Tabbar = createBottomTabNavigator<TabbarNavParamList>();

export const TabbarNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tabbar.Navigator screenOptions={{ headerShown: false }}>
      <Tabbar.Screen
        name={RouteName.HOME_DEMO}
        component={HomeScreen}
        options={{
          title: t("tabbar.home") ?? "",
          tabBarIcon: ({ size, color }) => <Icons name="home" size={size} color={color} />,
        }}
      />
      <Tabbar.Screen
        name={RouteName.ACCOUNT_DEMO}
        component={AccountScreen}
        options={{
          title: t("tabbar.settings") ?? "",
          tabBarIcon: ({ size, color }) => <Icons name="account" size={size} color={color} />,
        }}
      />
    </Tabbar.Navigator>
  );
};

TabbarNavigator.displayName = "TabbarNavigator";
