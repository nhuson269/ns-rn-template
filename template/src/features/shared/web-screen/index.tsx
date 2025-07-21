import {HeaderNav, Screen, Text} from 'components';
import React, {memo} from 'react';
import {styles} from './styles';

export const WebScreen = memo(() => {
  return (
    <>
      <HeaderNav isLeftView={false} title="WebView" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <Text value="HelloWorld" />
      </Screen>
    </>
  );
});

WebScreen.displayName = 'WebScreen';
