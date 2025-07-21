import {HeaderNav, Screen} from 'components';
import React, {memo} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {colorDemoStore} from 'stores';
import {styles} from './styles';

export const ReanimationDemoScreen = memo(() => {
  const colors = colorDemoStore().colors;
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const pressed = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        pressed.value = true;
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (event, ctx) => {
        x.value = ctx.startX + event.translationX;
        y.value = ctx.startY + event.translationY;
      },
      onEnd: (event, ctx) => {
        pressed.value = false;
        // x.value = withSpring(startingPosition);
        // y.value = withSpring(startingPosition);
      },
      onCancel: (event, ctx) => {
        pressed.value = false;
        // x.value = withSpring(startingPosition);
        // y.value = withSpring(startingPosition);
      },
      onFinish: (event, ctx) => {
        pressed.value = false;
        // x.value = withSpring(startingPosition);
        // y.value = withSpring(startingPosition);
      },
    },
    [],
  );

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  }, [x, y]);

  return (
    <>
      <HeaderNav title="Reanimation" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            style={[
              {
                marginLeft: 44,
                marginTop: 44,
                height: 60,
                width: 60,
                backgroundColor: colors.t_03,
              },
              uas,
            ]}
          />
        </PanGestureHandler>
      </Screen>
    </>
  );
});

ReanimationDemoScreen.displayName = 'ReanimationDemoScreen';
