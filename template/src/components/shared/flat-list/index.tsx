import React, { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList as RNFlatList, LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
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

  const [layout, setLayout] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

  const styleContainer: StyleProp<ViewStyle> = [styleOverride, styleProps, { backgroundColor: backgroundColor }];
  const styleContentContainer = [contentContainerStyleOverride, contentContainerStyleProps];
  const isFetching = fetching || ((rest.data?.length ?? 0) === 0 && rest.refreshing);
  const refreshing = rest.refreshing || ((rest.data?.length ?? 0) > 0 && fetching);

  const fetchingMoreComponent = useMemo(() => {
    return <ActivityIndicator style={{ marginBottom: 16 }} />;
  }, []);

  const fetchingComponent = useMemo(() => {
    return (
      <View center style={{ width: layout.width, height: layout.height }}>
        <ActivityIndicator size="large" style={{ marginBottom: 16 }} />
      </View>
    );
  }, [layout.height, layout.width]);

  const listFooterComponent = useMemo(() => {
    return fetchingMore ? fetchingMoreComponent : rest.ListFooterComponent;
  }, [fetchingMore, fetchingMoreComponent, rest.ListFooterComponent]);

  const listEmptyComponent = useMemo(() => {
    return isFetching ? fetchingComponent : rest.ListEmptyComponent;
  }, [isFetching, fetchingComponent, rest.ListEmptyComponent]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layoutNew = event.nativeEvent.layout;
      if (
        (layoutNew.height > 0 && layoutNew.height !== layout.height) ||
        (layoutNew.width > 0 && layoutNew.width !== layout.width)
      ) {
        setLayout(layoutNew);
      }
    },
    [layout.height, layout.width],
  );

  return (
    <RNFlatList
      {...rest}
      style={styleContainer}
      contentContainerStyle={styleContentContainer}
      ListFooterComponent={listFooterComponent}
      ListEmptyComponent={listEmptyComponent}
      refreshing={refreshing}
      onLayout={onLayout}
      onEndReached={rest.onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
});

FlatList.displayName = "FlatListCustom";
