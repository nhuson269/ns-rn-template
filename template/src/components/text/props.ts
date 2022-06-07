import { StyleProp, TextProps as NSTextProps, TextStyle } from "react-native";
import { TextPresets } from "./presets";
import { TxKeyPath } from "languages";

export interface TextProps extends NSTextProps {
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
  value?: string | undefined;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets;
}
