import {useIsFocused} from '@react-navigation/native';
import {Screen, Text} from 'components';
import React, {memo, useCallback, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colorDemoStore, userDemoStore} from 'stores';
import {styles} from './styles';

export const LaunchScreen = memo(() => {
  const isLoading = userDemoStore(useCallback(state => state.isLoading, []));
  const colors = colorDemoStore().colors;
  const isFocused = useIsFocused();
  const {bottom} = useSafeAreaInsets();
  const indicatorBottom = bottom > 0 ? bottom : 16;

  useEffect(() => {
    if (isFocused) {
      userDemoStore.getState().getCache();
    }
  }, [isFocused]);

  return (
    <Screen statusBar="light-content" safe="full" style={styles.container}>
      <Text style={styles.title} value="HelloWorld" color={colors.t_03} />
      <ActivityIndicator
        style={[styles.activity, {bottom: indicatorBottom}]}
        size="large"
        color={colors.t_03}
        animating={isLoading}
      />
    </Screen>
  );
});

LaunchScreen.displayName = 'LaunchScreen';
