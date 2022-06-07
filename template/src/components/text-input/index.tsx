import { Text } from "components/text";
import useIsMounted from "hooks/useIsMounted";
import { translate } from "languages";
import React, { memo, useCallback, useMemo, useState } from "react";
import { TextInput as RNTextInput, View } from "react-native";
import { TextInputProps } from "./props";
import { styles } from "./styles";

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
    style: styleOverride,
    inputStyle: inputStyleOverride,
    ...rest
  } = props;

  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder;
  const actualLabel = labelTx ? translate(labelTx) : label;

  const styleContainer = [styles.container, styleOverride];
  const styleInput = [styles.textInput, inputStyleOverride];

  const [borderColor, setBorderColor] = useState<string>("#F0F5FA");
  const [bgColor, setBgColor] = useState<string>("#F0F5FA");
  const isMounted = useIsMounted();

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

  const LabelText = useMemo(() => {
    return actualLabel ? <Text style={styles.label} value={actualLabel} /> : null;
  }, [actualLabel]);

  const MessageText = useMemo(() => {
    return message ? <Text style={styles.message} value={message} /> : null;
  }, [message]);

  return (
    <View style={styleContainer}>
      {LabelText}
      <View>
        <RNTextInput
          {...rest}
          style={[
            styleInput,
            {
              backgroundColor: bgColor,
              borderColor: borderColor,
            },
          ]}
          onEndEditing={keyboardDidHide}
          onFocus={keyboardDidShow}
          placeholder={actualPlaceholder}
          selectionColor="green"
        />
      </View>
      {MessageText}
    </View>
  );
});
