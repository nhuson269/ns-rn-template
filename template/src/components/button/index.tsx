import { Text } from "components/text";
import React, { memo, useMemo } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { presets } from "./presets";
import { ButtonProps } from "./props";
import { styles } from "./styles";

/**
 * A component which has a label and an input together.
 */
export const Button = memo((props: ButtonProps) => {
  const {
    preset = "default",
    titleTx,
    title,
    message,
    loading,
    style: styleOverride,
    buttonStyle: buttonStyleOverride,
    titleStyle: titleStyleOverride,
    ...rest
  } = props;

  const styleContainer = [styles.container, styleOverride];

  const MessageText = useMemo(() => {
    return message ? <Text style={styles.message} value={message} /> : null;
  }, [message]);

  const ContentView = useMemo(() => {
    const stylePreset = presets[preset] || presets.default;
    const styleButton = [stylePreset, buttonStyleOverride];
    const styleTitle = [styles.title, { color: preset === "default" ? "white" : "green" }, titleStyleOverride];

    if (loading) {
      return (
        <View style={styleButton}>
          <Text style={[styleTitle, { opacity: 0 }]} valueTx={titleTx} value={title} />
          <ActivityIndicator style={{ position: "absolute" }} color="white" />
        </View>
      );
    }
    return (
      <Pressable {...rest} style={styleButton}>
        <Text style={styleTitle} valueTx={titleTx} value={title} />
      </Pressable>
    );
  }, [titleTx, title, loading, preset, buttonStyleOverride, titleStyleOverride, rest]);

  return (
    <View style={styleContainer}>
      <View>{ContentView}</View>
      {MessageText}
    </View>
  );
});
