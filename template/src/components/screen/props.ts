import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { KeyboardOffsets, ScreenPresets } from "./presets";

export type ScreenProps = {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets;

  /**
   * An optional background color
   */
  backgroundColor?: string;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: "light-content" | "dark-content";

  /**
   * An optional status bar setting. Defaults to false.
   */
  translucent?: boolean;

  /**
   * Should we not wrap in SafeAreaView? Defaults to trl.
   ** no is []
   ** trl is ["top", "right", "left"]
   ** full is ["top", "right", "bottom", "left"]
   */
  safe?: "no" | "trl" | "full";

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
};
