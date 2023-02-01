import {ContentStyle, FlashList as RNFlashList} from '@shopify/flash-list';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, LayoutChangeEvent} from 'react-native';
import {View} from '../view';
import {FlashListProps} from './props';

export const FlashList = memo((props: FlashListProps<any>) => {
  const {
    fetching,
    fetchingMore,
    backgroundColor,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
    contentContainerStyle,
    ...rest
  } = props;

  let contentContainerStyleProps: ContentStyle | undefined;
  const bgColorProps =
    backgroundColor ?? contentContainerStyle?.backgroundColor;
  const paddingProps = padding ?? contentContainerStyle?.padding;
  const paddingTopProps = paddingTop ?? contentContainerStyle?.paddingTop;
  const paddingRightProps = paddingRight ?? contentContainerStyle?.paddingRight;
  const paddingBottomProps =
    paddingBottom ?? contentContainerStyle?.paddingBottom;
  const paddingLeftProps = paddingLeft ?? contentContainerStyle?.paddingLeft;
  const paddingHorizontalProps =
    paddingHorizontal ?? contentContainerStyle?.paddingHorizontal;
  const paddingVerticalProps =
    paddingVertical ?? contentContainerStyle?.paddingVertical;
  if (
    bgColorProps ||
    paddingProps ||
    paddingTopProps ||
    paddingRightProps ||
    paddingBottomProps ||
    paddingLeftProps ||
    paddingHorizontalProps ||
    paddingVerticalProps
  ) {
    contentContainerStyleProps = {
      backgroundColor: bgColorProps,
      padding: paddingProps,
      paddingTop: paddingTopProps,
      paddingRight: paddingRightProps,
      paddingBottom: paddingBottomProps,
      paddingLeft: paddingLeftProps,
      paddingHorizontal: paddingHorizontalProps,
      paddingVertical: paddingVerticalProps,
    };
  }

  const [layout, setLayout] = useState<{height: number; width: number}>({
    height: 0,
    width: 0,
  });

  const isFetching =
    fetching || ((rest.data?.length ?? 0) === 0 && rest.refreshing);
  const refreshing =
    rest.refreshing || ((rest.data?.length ?? 0) > 0 && fetching);

  const fetchingMoreComponent = useMemo(() => {
    return <ActivityIndicator style={{marginBottom: 16}} />;
  }, []);

  const fetchingComponent = useMemo(() => {
    return (
      <View center style={{width: layout.width, height: layout.height}}>
        <ActivityIndicator size="large" style={{marginBottom: 16}} />
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
    <RNFlashList
      {...rest}
      contentContainerStyle={contentContainerStyleProps}
      ListFooterComponent={listFooterComponent}
      ListEmptyComponent={listEmptyComponent}
      refreshing={refreshing}
      onLayout={onLayout}
      onEndReached={rest.onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
});

FlashList.displayName = 'FlashListCustom';
