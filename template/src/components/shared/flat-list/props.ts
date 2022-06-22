import { StyleProp, FlatListProps as RNFlatListProps, ViewStyle } from "react-native";

export interface FlatListProps<ItemT> extends RNFlatListProps<ItemT> {
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional content container style overrides useful for margins & padding.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

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
