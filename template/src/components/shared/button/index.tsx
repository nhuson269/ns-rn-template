import React, { memo, useMemo } from "react";
import { ActivityIndicator, StyleProp, TextStyle, ViewStyle } from "react-native";
import { presets } from "./presets";
import { ButtonProps } from "./props";
import { styles } from "./styles";
import { colorStore } from "stores";
import { Text } from "../text";
import { View } from "../view";
import { Pressable } from "../pressable";

/**
 * A component which has a label and an input together.
 */
export const Button = memo((props: ButtonProps) => {
  const {
    preset = "default",
    titleTx,
    title,
    titleColor,
    backgroundColor,
    message,
    loading,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    style: styleOverride,
    buttonStyle: buttonStyleOverride,
    titleStyle: titleStyleOverride,
    ...rest
  } = props;

  const colors = colorStore().colors;
  const styleProps: StyleProp<ViewStyle> = {};
  if (marginTop) {
    styleProps.marginTop = marginTop;
  }
  if (marginRight) {
    styleProps.marginRight = marginRight;
  }
  if (marginBottom) {
    styleProps.marginBottom = marginBottom;
  }
  if (marginLeft) {
    styleProps.marginLeft = marginLeft;
  }
  if (marginHorizontal) {
    styleProps.marginHorizontal = marginHorizontal;
  }
  if (marginVertical) {
    styleProps.marginVertical = marginVertical;
  }
  const styleContainer = [styles.container, styleOverride, styleProps];

  const MessageText = useMemo(() => {
    return message ? <Text style={styles.message} value={message} color={colors.error} /> : null;
  }, [message, colors.error]);

  const ContentView = useMemo(() => {
    const stylePreset = presets[preset] || presets.default;
    const styleButton: StyleProp<ViewStyle> = [
      { backgroundColor: backgroundColor || colors.t_03 },
      stylePreset,
      buttonStyleOverride,
    ];
    const colorTitle = titleColor || preset === "default" ? colors.t_01 : colors.t_03;
    const styleTitle: StyleProp<TextStyle> = [styles.title, { color: colorTitle }, titleStyleOverride];

    if (loading) {
      return (
        <View style={styleButton}>
          <Text style={[styleTitle, { opacity: 0 }]} valueTx={titleTx} value={title} />
          <ActivityIndicator style={{ position: "absolute" }} color={colorTitle} />
        </View>
      );
    }
    return (
      <Pressable {...rest} style={styleButton}>
        <Text style={styleTitle} valueTx={titleTx} value={title} />
      </Pressable>
    );
  }, [
    backgroundColor,
    colors.t_03,
    colors.t_01,
    buttonStyleOverride,
    titleColor,
    titleStyleOverride,
    loading,
    rest,
    titleTx,
    title,
    preset,
  ]);

  return (
    <View style={styleContainer}>
      {ContentView}
      {MessageText}
    </View>
  );
});

Button.displayName = "ButtonCustom";
