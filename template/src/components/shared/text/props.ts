import { StyleProp, TextProps as NSTextProps, TextStyle } from "react-native";
import { TextPresets } from "./presets";
import { TxKeyPath } from "languages";

export interface TextProps extends NSTextProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   */
  valueTx?: TxKeyPath | undefined;

  /**
   * The text to display if not using `valueTx` or nested components.
   */
  value?: string | number | undefined;

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets;

  /**
   * FontSize of text.
   */
  size?: number;

  /**
   * Color of text.
   */
  color?: string;

  /**
   * Style of text, flex = 1.
   */
  flex1?: boolean;

  /**
   * Style of text, fontStyles = italic.
   */
  italic?: boolean;

  /**
   * Style of text, flex = 1.
   */
  lineHeight?: number;

  /**
   * Style of text, textDecorationLines = underline.
   */
  underline?: boolean;

  /**
   * Style textAlign of text.
   */
  textAlign?: "auto" | "left" | "right" | "center" | "justify";

  /**
   * Style textAlignVertical of text.
   */
  textAlignVertical?: "auto" | "top" | "bottom" | "center";

  /**
   * Text style, marginTop.
   */
  marginTop?: number;

  /**
   * Text style, marginRight.
   */
  marginRight?: number;

  /**
   * Text style, marginBottom.
   */
  marginBottom?: number;

  /**
   * Text style, marginLeft.
   */
  marginLeft?: number;

  /**
   * Text style, marginHorizontal.
   */
  marginHorizontal?: number;

  /**
   * Text style, marginVertical.
   */
  marginVertical?: number;
}
