import React, { memo, useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Edge as SafeEdge, SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "./props";
import { offsets, presets } from "./presets";
import { useIsFocused } from "@react-navigation/native";
import { statusBarStore } from "components/status-bar/status-bar.store";

const isIos = Platform.OS === "ios";

const ScreenWithoutScrolling = memo((props: ScreenProps) => {
  const preset = presets.fixed;
  const safe = props.safe || "trl";
  const safeEdge: SafeEdge[] =
    safe === "full"
      ? ["top", "right", "bottom", "left"]
      : safe === "trl"
      ? ["top", "right", "left"]
      : ["right", "left"];

  const bgColor = props.backgroundColor;
  const styleContainer = [preset.outer, bgColor ? { backgroundColor: bgColor } : {}];
  const styleContent = [preset.inner, props.style || {}];

  return (
    <KeyboardAvoidingView
      style={styleContainer}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <SafeAreaView style={styleContent} edges={safeEdge}>
        {props.children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
});

const ScreenWithScrolling = memo((props: ScreenProps) => {
  const preset = presets.scroll;
  const safe = props.safe || "trl";
  const safeEdge: SafeEdge[] =
    safe === "full"
      ? ["top", "right", "bottom", "left"]
      : safe === "trl"
      ? ["top", "right", "left"]
      : ["right", "left"];

  const bgColor = props.backgroundColor;
  const styleContainer = [preset.outer, bgColor ? { backgroundColor: bgColor } : {}];
  const styleContent = [preset.inner, props.style || {}];

  return (
    <KeyboardAvoidingView
      style={styleContainer}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <SafeAreaView style={styleContainer} edges={safeEdge}>
        <ScrollView
          style={styleContainer}
          contentContainerStyle={styleContent}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}>
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
});

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen = memo((props: ScreenProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      statusBarStore.getState().setStyle(props.statusBar || "dark-content");
    }
  }, [isFocused, props.statusBar]);

  switch (props.preset) {
    case "scroll":
      return <ScreenWithScrolling {...props} />;
    default:
      return <ScreenWithoutScrolling {...props} />;
  }
});

Screen.displayName = "ScreenCustom";
