import Reanimated from "react-native-reanimated";
import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ViewProps } from "./props";

export const View = memo((props: ViewProps) => {
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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
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
  if (paddingTop) {
    styleProps.paddingTop = paddingTop;
  }
  if (paddingRight) {
    styleProps.paddingRight = paddingRight;
  }
  if (paddingBottom) {
    styleProps.paddingBottom = paddingBottom;
  }
  if (paddingLeft) {
    styleProps.paddingLeft = paddingLeft;
  }
  if (paddingHorizontal) {
    styleProps.paddingHorizontal = paddingHorizontal;
  }
  if (paddingVertical) {
    styleProps.paddingVertical = paddingVertical;
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

  return (
    <Reanimated.View {...rest} style={[styleOverride, styleProps]}>
      {children}
    </Reanimated.View>
  );
});

View.displayName = "ViewCustom";
