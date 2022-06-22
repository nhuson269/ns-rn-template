import React, { memo, useMemo } from "react";
import { ActivityIndicator, FlatList as RNFlatList, StyleProp, ViewStyle } from "react-native";
import { View } from "../view";
import { FlatListProps } from "./props";

export const FlatList = memo((props: FlatListProps<any>) => {
  const {
    fetching,
    fetchingMore,
    backgroundColor,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
    style: styleOverride,
    contentContainerStyle: contentContainerStyleOverride,
    ...rest
  } = props;

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
  const contentContainerStyleProps: StyleProp<ViewStyle> = {};
  if (paddingTop) {
    contentContainerStyleProps.paddingTop = paddingTop;
  }
  if (paddingRight) {
    contentContainerStyleProps.paddingRight = paddingRight;
  }
  if (paddingBottom) {
    contentContainerStyleProps.paddingBottom = paddingBottom;
  }
  if (paddingLeft) {
    contentContainerStyleProps.paddingLeft = paddingLeft;
  }
  if (paddingHorizontal) {
    contentContainerStyleProps.paddingHorizontal = paddingHorizontal;
  }
  if (paddingVertical) {
    contentContainerStyleProps.paddingVertical = paddingVertical;
  }

  const styleContainer: StyleProp<ViewStyle> = [styleOverride, styleProps, { backgroundColor: backgroundColor }];
  const styleContentContainer = [contentContainerStyleOverride, contentContainerStyleProps];
  const isFetching = fetching || ((rest.data?.length ?? 0) === 0 && rest.refreshing);
  const refreshing = rest.refreshing || ((rest.data?.length ?? 0) > 0 && fetching);

  const fetchingMoreComponent = useMemo(() => {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }, []);

  const listFooterComponent = fetchingMore ? fetchingMoreComponent : rest.ListFooterComponent;

  return (
    <RNFlatList
      {...rest}
      style={styleContainer}
      contentContainerStyle={styleContentContainer}
      refreshing={refreshing}
      onEndReached={rest.onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={listFooterComponent}
    />
  );
});

FlatList.displayName = "FlatListCustom";
