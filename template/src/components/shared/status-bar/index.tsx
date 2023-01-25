import React, {memo, useCallback} from 'react';
import {StatusBar as RNStatusBar} from 'react-native';
import {statusBarStore} from './status-bar.store';

export const StatusBar = memo(() => {
  const barStyle = statusBarStore(useCallback(state => state.style, []));
  return (
    <RNStatusBar
      animated
      translucent
      backgroundColor="transparent"
      barStyle={barStyle}
    />
  );
});

StatusBar.displayName = 'StatusBarCustom';
