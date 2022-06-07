import { translate } from "languages";
import React, { memo } from "react";
import { Text as ReactNativeText } from "react-native";
import { presets } from "./presets";
import { TextProps } from "./props";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const Text = memo((props: TextProps) => {
  // grab the props
  const { preset = "default", valueTx, value, children, style: styleOverride, ...rest } = props;

  // figure out which content to use
  const i18nValue = valueTx && translate(valueTx);
  const content = i18nValue || value || children;

  const style = presets[preset] || presets.default;
  const styles = [style, styleOverride];

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
});
