import {ViewStyle} from 'react-native';

/**
 * All text will start off looking like this.
 */
const DEFAULT: ViewStyle = {
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingHorizontal: 12,
};

const TRANSPARENT: ViewStyle = {
  backgroundColor: 'transparent',
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default button styles.
   */
  default: DEFAULT,

  /**
   * A transparent version of the button styles.
   */
  transparent: TRANSPARENT,
};

/**
 * A list of preset names.
 */
export type ButtonPresets = keyof typeof presets;
