import {
  ContentStyle,
  FlashListProps as RNFlashListProps,
} from '@shopify/flash-list';

export interface FlashListProps<ItemT> extends RNFlashListProps<ItemT> {
  /**
   * List fetching data.
   */
  fetching?: boolean;

  /**
   * List fetching more data.
   */
  fetchingMore?: boolean;

  /**
   * Optional content container style overrides useful for margins & padding.
   */
  contentContainerStyle?: ContentStyle;

  /**
   * Optional backgroundColor overrides for the button.
   */
  backgroundColor?: string;

  /**
   * Content container style, padding.
   */
  padding?: number;

  /**
   * Container style, paddingTop.
   */
  paddingTop?: number;

  /**
   * Content container style, paddingRight.
   */
  paddingRight?: number;

  /**
   * Content container style, paddingBottom.
   */
  paddingBottom?: number;

  /**
   * Content container style, paddingLeft.
   */
  paddingLeft?: number;

  /**
   * Content container style, paddingHorizontal.
   */
  paddingHorizontal?: number;

  /**
   * Content container style, paddingVertical.
   */
  paddingVertical?: number;
}
