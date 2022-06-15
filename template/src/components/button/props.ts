import { TxKeyPath } from "languages";
import { StyleProp, PressableProps, ViewStyle, TextStyle } from "react-native";
import { ButtonPresets } from "./presets";

export interface ButtonProps extends PressableProps {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the button.
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Optional backgroundColor overrides for the button.
   */
  backgroundColor?: string;

  /**
   * Optional style overrides for the title.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Optional color overrides for the title.
   */
  titleColor?: string;

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
   * Optional animating ActivityIndicator.
   */
  loading?: boolean;

  /**
   * One of the different types of button presets.
   */
  preset?: ButtonPresets;

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
