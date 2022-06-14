import React, { memo, useMemo } from "react";
import { ActivityIndicator, StyleProp, TextStyle, ViewStyle } from "react-native";
import { presets } from "./presets";
import { ButtonProps } from "./props";
import { styles } from "./styles";
import { Pressable, Text, View } from "components";

/**
 * A component which has a label and an input together.
 */
export const Button = memo((props: ButtonProps) => {
  const {
    preset = "default",
    titleTx,
    title,
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
    return message ? <Text style={styles.message} value={message} /> : null;
  }, [message]);

  const ContentView = useMemo(() => {
    const stylePreset = presets[preset] || presets.default;
    const styleButton = [stylePreset, buttonStyleOverride];
    const styleTitle: StyleProp<TextStyle> = [
      styles.title,
      { color: preset === "default" ? "white" : "green" },
      titleStyleOverride,
    ];

    if (loading) {
      return (
        <View style={styleButton}>
          <Text style={[styleTitle, { opacity: 0 }]} valueTx={titleTx} value={title} />
          <ActivityIndicator style={{ position: "absolute" }} color="white" />
        </View>
      );
    }
    return (
      <Pressable {...rest} style={styleButton}>
        <Text style={styleTitle} valueTx={titleTx} value={title} />
      </Pressable>
    );
  }, [titleTx, title, loading, preset, buttonStyleOverride, titleStyleOverride, rest]);

  return (
    <View style={styleContainer}>
      {ContentView}
      {MessageText}
    </View>
  );
});

Button.displayName = "ButtonCustom";
