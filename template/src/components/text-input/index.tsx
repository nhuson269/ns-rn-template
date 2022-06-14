import useIsMounted from "hooks/useIsMounted";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, StyleProp, TextInput as RNTextInput, ViewStyle } from "react-native";
import { TextInputProps } from "./props";
import { styles } from "./styles";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View } from "components";
import { useTranslation } from "react-i18next";

/**
 * A component which has a label and an input together.
 */
export const TextInput = memo((props: TextInputProps) => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    message,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    ...rest
  } = props;
  const { t } = useTranslation();

  const actualPlaceholder = placeholderTx ? t(placeholderTx) : placeholder;
  const actualLabel = labelTx ? t(labelTx) : label;

  const [borderColor, setBorderColor] = useState<string>("#F0F5FA");
  const [bgColor, setBgColor] = useState<string>("#F0F5FA");
  const [isSecure, setIsSecure] = useState<boolean>(rest.secureTextEntry || false);
  const isMounted = useIsMounted();

  const styleProps: StyleProp<ViewStyle> = {};
  if (marginTop) {
    styleProps.marginTop = marginTop;
  }
  if (marginRight) {
    styleProps.marginRight = marginRight;
  }
  if (marginBottom) {
    styleProps.marginBottom = marginBottom;
  }
  if (marginLeft) {
    styleProps.marginLeft = marginLeft;
  }
  if (marginHorizontal) {
    styleProps.marginHorizontal = marginHorizontal;
  }
  if (marginVertical) {
    styleProps.marginVertical = marginVertical;
  }
  const styleContainer = [styles.container, styleOverride, styleProps];
  const styleInput = [styles.textInput, inputStyleOverride, { backgroundColor: bgColor, borderColor: borderColor }];

  const keyboardDidShow = useCallback(() => {
    if (isMounted()) {
      setBorderColor("green");
      setBgColor("white");
    }
  }, [isMounted]);

  const keyboardDidHide = useCallback(() => {
    if (isMounted()) {
      setBorderColor("#F0F5FA");
      setBgColor("#F0F5FA");
    }
  }, [isMounted]);

  const changeIsSecure = useCallback(() => {
    setIsSecure(!isSecure);
  }, [isSecure]);

  const LabelText = useMemo(() => {
    return actualLabel ? <Text style={styles.label} value={actualLabel} /> : null;
  }, [actualLabel]);

  const SecureView = useMemo(() => {
    return !rest.secureTextEntry ? null : (
      <Pressable style={styles.btEye} onPress={changeIsSecure}>
        <Icons name={isSecure ? "eye-off" : "eye"} size={16} />
      </Pressable>
    );
  }, [rest.secureTextEntry, isSecure, changeIsSecure]);

  const MessageText = useMemo(() => {
    return message ? <Text style={styles.message} value={message} /> : null;
  }, [message]);

  return (
    <View style={styleContainer}>
      {LabelText}
      <View>
        <RNTextInput
          {...rest}
          style={styleInput}
          selectionColor="green"
          secureTextEntry={isSecure}
          onEndEditing={keyboardDidHide}
          onFocus={keyboardDidShow}
          placeholder={actualPlaceholder}
        />
        {SecureView}
      </View>
      {MessageText}
    </View>
  );
});

TextInput.displayName = "TextInputCustom";
