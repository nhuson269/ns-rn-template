import useIsMounted from 'hooks/useIsMounted';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  Pressable,
  StyleProp,
  TextInput as RNTextInput,
  ViewStyle,
} from 'react-native';
import {TextInputProps} from './props';
import {styles} from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'components';
import {useTranslation} from 'react-i18next';
import {colorDemoStore} from 'stores';

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

  const colors = colorDemoStore().colors;
  const [borderColor, setBorderColor] = useState<string>(colors.bg_02);
  const [bgColor, setBgColor] = useState<string>(colors.bg_02);
  const [isSecure, setIsSecure] = useState<boolean>(
    rest.secureTextEntry || false,
  );
  const isMounted = useIsMounted();
  const {t} = useTranslation();

  const actualPlaceholder = placeholderTx ? t(placeholderTx) : placeholder;

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
  const styleInput = [
    styles.textInput,
    inputStyleOverride,
    {backgroundColor: bgColor, borderColor: borderColor},
  ];

  const keyboardDidShow = useCallback(() => {
    if (isMounted()) {
      setBorderColor(colors.t_03);
      setBgColor(colors.bg_01);
    }
  }, [isMounted, colors.bg_01, colors.t_03]);

  const keyboardDidHide = useCallback(() => {
    if (isMounted()) {
      setBorderColor(colors.bg_02);
      setBgColor(colors.bg_02);
    }
  }, [isMounted, colors.bg_02]);

  const changeIsSecure = useCallback(() => {
    setIsSecure(!isSecure);
  }, [isSecure]);

  const LabelText = useMemo(() => {
    return label || labelTx ? (
      <Text
        style={styles.label}
        value={label}
        valueTx={labelTx}
        color={colors.t_02}
      />
    ) : null;
  }, [label, labelTx, colors.t_02]);

  const SecureView = useMemo(() => {
    return !rest.secureTextEntry ? null : (
      <Pressable style={styles.btEye} onPress={changeIsSecure}>
        <Icons name={isSecure ? 'eye-off' : 'eye'} size={16} />
      </Pressable>
    );
  }, [rest.secureTextEntry, isSecure, changeIsSecure]);

  const MessageText = useMemo(() => {
    return message ? (
      <Text style={styles.message} value={message} color={colors.error} />
    ) : null;
  }, [message, colors.error]);

  return (
    <View style={styleContainer}>
      {LabelText}
      <View>
        <RNTextInput
          {...rest}
          style={styleInput}
          selectionColor={colors.t_03}
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

TextInput.displayName = 'TextInputCustom';
