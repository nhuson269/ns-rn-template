import React, { memo, useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Edge as SafeEdge, SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "./props";
import { isNonScrolling, offsets, presets } from "./presets";
import { useIsFocused } from "@react-navigation/native";
import { statusBarStore } from "components/status-bar/status-bar.store";

const isIos = Platform.OS === "ios";

const ScreenWithoutScrolling = memo((props: ScreenProps) => {
  const preset = presets.fixed;
  const style = props.style || {};
  // const translucent = props.translucent || true;
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};
  const safeEdge: SafeEdge[] = props.safe === "full" ? ["top", "right", "bottom", "left"] : ["top", "right", "left"];
  const edges = props.safe === "no" ? [] : safeEdge;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      {/* <StatusBar
        animated
        translucent={translucent}
        backgroundColor="transparent"
        barStyle={props.statusBar || "dark-content"}
      /> */}
      <SafeAreaView style={[preset.inner, style]} edges={edges}>
        {props.children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
});

const ScreenWithScrolling = memo((props: ScreenProps) => {
  const preset = presets.scroll;
  const style = props.style || {};
  // const translucent = props.translucent || true;
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};
  const safeEdge: SafeEdge[] = props.safe === "full" ? ["top", "right", "bottom", "left"] : ["top", "right", "left"];
  const edges = props.safe === "no" ? [] : safeEdge;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      {/* <StatusBar
        animated
        translucent={translucent}
        backgroundColor="transparent"
        barStyle={props.statusBar || "dark-content"}
      /> */}
      <SafeAreaView style={[preset.outer, backgroundStyle]} edges={edges}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
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

  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
});

Screen.displayName = "ScreenCustom";
