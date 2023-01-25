import {FlashListProps as RNFlashListProps} from '@shopify/flash-list';
import {StyleProp, ViewStyle} from 'react-native';

export interface FlashListProps<ItemT> extends RNFlashListProps<ItemT> {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * List fetching data.
   */
  fetching?: boolean;

  /**
   * List fetching more data.
   */
  fetchingMore?: boolean;

  /**
   * Optional backgroundColor overrides for the button.
   */
  backgroundColor?: string;

  /**
   * Container style, marginTop.
   */
  marginTop?: number;

  /**
   * Container style, marginRight.
   */
  marginRight?: number;

  /**
   * Container style, marginBottom.
   */
  marginBottom?: number;

  /**
   * Container style, marginLeft.
   */
  marginLeft?: number;

  /**
   * Container style, marginHorizontal.
   */
  marginHorizontal?: number;

  /**
   * Container style, marginVertical.
   */
  marginVertical?: number;

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
