import React, { memo } from "react";
import { TouchableOpacity as RNTouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacityProps } from "./props";

export const TouchableOpacity = memo((props: TouchableOpacityProps) => {
  const {
    flex1,
    flexRow,
    overflow,
    absolute,
    absoluteFill,
    backgroundColor,
    size,
    width,
    height,
    borderRadius,
    alignItems,
    justifyContent,
    center,
    shadow,
    skeleton,
    children,
    style: styleOverride,
    ...rest
  } = props;

  const styleProps: StyleProp<ViewStyle> = {};
  if (flex1) {
    styleProps.flex = 1;
  }
  if (flexRow) {
    styleProps.flexDirection = "row";
  }
  if (overflow) {
    styleProps.overflow = overflow;
  }
  if (absolute) {
    styleProps.position = "absolute";
  }
  if (absoluteFill) {
    styleProps.position = "absolute";
    styleProps.top = 0;
    styleProps.right = 0;
    styleProps.bottom = 0;
    styleProps.left = 0;
  }
  if (backgroundColor) {
    styleProps.backgroundColor = backgroundColor;
  }
  if (size) {
    styleProps.width = size;
    styleProps.height = size;
  }
  if (width) {
    styleProps.width = width;
  }
  if (height) {
    styleProps.height = height;
  }
  if (borderRadius) {
    styleProps.borderRadius = borderRadius;
  }
  if (alignItems) {
    styleProps.alignItems = alignItems;
  }
  if (justifyContent) {
    styleProps.justifyContent = justifyContent;
  }
  if (center) {
    styleProps.alignItems = "center";
    styleProps.justifyContent = "center";
  }
  if (shadow) {
    styleProps.shadowColor = "rgba(0, 0, 0, 0.1)";
    styleProps.shadowOpacity = 1;
    styleProps.shadowRadius = 4;
    styleProps.shadowOffset = { width: 0, height: 2 };
    styleProps.elevation = 4;
  }
  if (skeleton) {
    // Skeleton loader
  }
  const styles: StyleProp<ViewStyle> = [styleOverride, styleProps];

  return (
    <RNTouchableOpacity {...rest} style={styles}>
      {children}
    </RNTouchableOpacity>
  );
});

TouchableOpacity.displayName = "TouchableOpacityCustom";
