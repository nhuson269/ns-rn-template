import React, {useCallback} from 'react';
import {RouteName} from 'navigators/shared/routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorDemoStore} from 'stores';
import { translate } from 'languages';
import { HomeDemoScreen } from 'features/home/screens';
import { AccountDemoScreen } from 'features/profile/screens';

export type TabbarNavParamList = {
  [RouteName.HOME_DEMO]: undefined;
  [RouteName.ACCOUNT_DEMO]: undefined;
};

const Tabbar = createBottomTabNavigator<TabbarNavParamList>();

export const TabbarDemoNavigator = () => {
  const colors = colorDemoStore().colors;

  const tabBarIconHome = useCallback(
    ({size, color}: {size: number,color: string}) => (
      <Icons name="home" size={size} color={color} />
    ),
    [],
  );

  const tabBarIconAccount = useCallback(
    ({size, color}: {size: number,color: string}) => (
      <Icons name="account" size={size} color={color} />
    ),
    [],
  );

  return (
    <Tabbar.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: colors.t_03}}>
      <Tabbar.Screen
        name={RouteName.HOME_DEMO}
        component={HomeDemoScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: translate("tabbar.home"),
          tabBarIcon: tabBarIconHome
        }}
      />
      <Tabbar.Screen
        name={RouteName.ACCOUNT_DEMO}
        component={AccountDemoScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: translate("tabbar.settings"),
          tabBarIcon: tabBarIconAccount
        }}
      />
    </Tabbar.Navigator>
  );
};

TabbarDemoNavigator.displayName = 'TabbarDemoNavigator';
