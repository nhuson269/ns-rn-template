import { TxKeyPath } from "languages";
import { StyleProp, TextInputProps as RNTextInputProps, TextStyle, ViewStyle } from "react-native";

export interface TextInputProps extends RNTextInputProps {
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
  message?: string;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;
}
