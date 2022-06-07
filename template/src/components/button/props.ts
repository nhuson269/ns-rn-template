import { TxKeyPath } from "languages";
import { StyleProp, PressableProps, ViewStyle, TextStyle } from "react-native";
import { ButtonPresets } from "./presets";

export interface ButtonProps extends PressableProps {
  /**
   * The title i18n key.
   */
  titleTx?: TxKeyPath;

  /**
   * The title text if no titleTx is provided.
   */
  title?: string;

  /**
   * The message text.
   */
  message?: string;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the button.
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the button.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Optional animating ActivityIndicator.
   */
  loading?: boolean;

  /**
   * One of the different types of button presets.
   */
  preset?: ButtonPresets;
}
