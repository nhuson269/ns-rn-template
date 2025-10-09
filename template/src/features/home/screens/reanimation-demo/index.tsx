import { HeaderNav, Screen } from 'components';
import React, { memo, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { colorDemoStore } from 'stores';
import { styles } from './styles';

export const ReanimationDemoScreen = memo(() => {
  const colors = colorDemoStore().colors;
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const pressed = useSharedValue(false);

  const eventHandler = useMemo(() => Gesture.Pan()
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate((event) => {
      x.value = event.translationX;
      y.value = event.translationY;
    })
    .onEnd(() => {
      pressed.value = false;
    })
    .onFinalize(() => {
      // tương đương onFinish / onCancel
      pressed.value = false;
    }), [pressed, x, y]);

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  }, [x, y]);

  return (
    <>
      <HeaderNav title="Reanimation" />
      <Screen statusBar="light-content" safe="rl" style={styles.container}>
        <GestureDetector gesture={eventHandler}>
          <Animated.View
            style={[
              styles.viewMini,
              { backgroundColor: colors.t_03 },
              uas,
            ]}
          />
        </GestureDetector>
      </Screen>
    </>
  );
});

ReanimationDemoScreen.displayName = 'ReanimationDemoScreen';
