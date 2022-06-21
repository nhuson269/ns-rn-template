import { TxKeyPath } from "languages";
import { StyleProp, TextInputProps as RNTextInputProps, TextStyle, ViewStyle } from "react-native";

export interface TextInputProps extends RNTextInputProps {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath;

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;

  /**
   * The message text.
   */
  message?: string | undefined;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Container style, marginTop.
   */
  marginTop?: number;

  /**
   * Container style, marginRight.
   */
  marginRight?: number;

  /**
   * Container style, marginBottom.
   */
  marginBottom?: number;

  /**
   * Container style, marginLeft.
   */
  marginLeft?: number;

  /**
   * Container style, marginHorizontal.
   */
  marginHorizontal?: number;

  /**
   * Container style, marginVertical.
   */
  marginVertical?: number;
}
