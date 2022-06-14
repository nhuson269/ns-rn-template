import Reanimated from "react-native-reanimated";
import { translate } from "languages";
import React, { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import { presets } from "./presets";
import { TextProps } from "./props";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export const Text = memo((props: TextProps) => {
  const {
    preset = "default",
    valueTx,
    value,
    size,
    color,
    flex1,
    italic,
    lineHeight,
    underline,
    textAlign,
    textAlignVertical,
    children,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const i18nValue = valueTx && translate(valueTx);
  const content = i18nValue || value;

  const styleProps: StyleProp<TextStyle> = {};
  if (size) {
    styleProps.fontSize = size;
  }
  if (color) {
    styleProps.color = color;
  }
  if (flex1) {
    styleProps.flex = 1;
  }
  if (italic) {
    styleProps.fontStyle = "italic";
  }
  if (lineHeight) {
    styleProps.lineHeight = lineHeight;
  }
  if (underline) {
    styleProps.textDecorationLine = "underline";
  }
  if (textAlign) {
    styleProps.textAlign = textAlign;
  }
  if (textAlignVertical) {
    styleProps.textAlignVertical = textAlignVertical;
  }
  const style: TextStyle = presets[preset] || presets.default;
  const styles: StyleProp<TextStyle> = [style, styleOverride, styleProps];

  return (
    <Reanimated.Text {...rest} style={styles}>
      {content}
      {React.Children.map(children, (child: any) => {
        const childValue = child?.valueOf();
        return typeof childValue === "object"
          ? React.cloneElement(child, { style: [styles, childValue.props?.style || {}] })
          : null;
      })}
    </Reanimated.Text>
  );
});

Text.displayName = "TextCustom";
