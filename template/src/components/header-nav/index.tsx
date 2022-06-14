import { Button, Text, View } from "components";
import navHelper from "navigators/shared/helper";
import React, { memo, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderNavProps } from "./props";
import { styles } from "./styles";

export const HeaderNav = memo((props: HeaderNavProps) => {
  const {
    titleTx,
    title,
    style: styleOverride,
    statusBarStyle: statusBarStyleOverride,
    headerStyle: headerStyleOverride,
    isLeftView = true,
    ignoreStatusBar = false,
  } = props;

  const insets = useSafeAreaInsets();
  const styleStatusBar: StyleProp<ViewStyle> = [
    styles.statusBar,
    statusBarStyleOverride,
    { height: ignoreStatusBar ? 0 : insets.top },
  ];
  const styleTitle: StyleProp<ViewStyle> = [styles.title, { left: isLeftView ? 76 : 16 }];

  const LeftView = useMemo(() => {
    return isLeftView ? <Button titleTx="common.back" onPress={navHelper.goBack} /> : null;
  }, [isLeftView]);

  return (
    <View style={[styles.container, styleOverride]}>
      <View style={styleStatusBar} />
      <View style={[styles.header, headerStyleOverride]}>
        {LeftView}
        <Text style={styleTitle} valueTx={titleTx} value={title} />
      </View>
    </View>
  );
});

HeaderNav.displayName = "HeaderNav";
