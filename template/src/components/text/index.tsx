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
  const { preset = "default", valueTx, value, children, style: styleOverride, ...rest } = props;

  // figure out which content to use
  const i18nValue = valueTx && translate(valueTx);
  const content = i18nValue || value;

  const style = presets[preset] || presets.default;
  const styles = [style, styleOverride];

  return (
    <ReactNativeText {...rest} key="TextCustom" style={styles}>
      {content}
      {React.Children.map(children, (child: any) => {
        const childValue = child?.valueOf();
        if (typeof childValue === "object") {
          return React.cloneElement(child, { style: [styles, childValue.props?.style || {}] });
        }
        return null;
      })}
    </ReactNativeText>
  );
});

Text.displayName = "TextCustom";
