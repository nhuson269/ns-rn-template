import { StyleProp, ViewStyle } from "react-native";
import { TxKeyPath } from "languages";

export interface HeaderNavProps {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the StatusBar view.
   */
  statusBarStyle?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the Header view.
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * The title i18n key.
   */
  titleTx?: TxKeyPath;

  /**
   * The title text if no titleTx is provided.
   */
  title?: string;

  /**
   * Optional ignore StatusBar height, default is false.
   */
  ignoreStatusBar?: boolean;
}
