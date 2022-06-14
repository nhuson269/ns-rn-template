import { FlexAlignType, StyleProp, PressableProps as RNPressableProps, ViewStyle } from "react-native";

export interface PressableProps extends RNPressableProps {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * View style, flex: 1
   */
  flex1?: boolean;

  /**
   * View style, flexDirection: "row".
   */
  flexRow?: boolean;

  /**
   * View style, overflow.
   */
  overflow?: "visible" | "hidden" | "scroll";

  /**
   * View style, position: "absolute".
   */
  absolute?: boolean;

  /**
   * View style, position: "absolute", top: 0, right: 0, bottom: 0, left: 0.
   */
  absoluteFill?: boolean;

  /**
   * View style, backgroundColor.
   */
  backgroundColor?: string;

  /**
   * View style, width === height.
   */
  size?: number | string;

  /**
   * View style, width.
   */
  width?: number | string;

  /**
   * View style, height.
   */
  height?: number | string;

  /**
   * View style, borderRadius.
   */
  borderRadius?: number;

  /**
   * View style, marginTop.
   */
  marginTop?: number;

  /**
   * View style, marginRight.
   */
  marginRight?: number;

  /**
   * View style, marginBottom.
   */
  marginBottom?: number;

  /**
   * View style, marginLeft.
   */
  marginLeft?: number;

  /**
   * View style, marginHorizontal.
   */
  marginHorizontal?: number;

  /**
   * View style, marginVertical.
   */
  marginVertical?: number;

  /**
   * View style, alignItems: "center", justifyContent: "center".
   */
  center?: boolean;

  /**
   * View style, alignItems.
   */
  alignItems?: FlexAlignType;

  /**
   * View style, justifyContent.
   */
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

  /**
   * View style, turn on shadow.
   */
  shadow?: boolean;

  /**
   * Skeleton loader.
   */
  skeleton?: boolean;
}
