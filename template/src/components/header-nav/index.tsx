import { Button } from "components";
import { Text } from "components/text";
import navHelper from "navigators/shared/helper";
import React, { memo } from "react";
import { View } from "react-native";
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
    ignoreStatusBar = false,
  } = props;

  const insets = useSafeAreaInsets();
  const styleContainer = [styles.container, styleOverride];
  const styleStatusBar = [styles.statusBar, statusBarStyleOverride, { height: ignoreStatusBar ? 0 : insets.top }];
  const styleHeader = [styles.header, headerStyleOverride];

  return (
    <View style={styleContainer}>
      <View style={styleStatusBar} />
      <View style={styleHeader}>
        <Button titleTx="common.back" onPress={navHelper.goBack} />
        <Text style={styles.title} valueTx={titleTx} value={title} />
      </View>
    </View>
  );
});
