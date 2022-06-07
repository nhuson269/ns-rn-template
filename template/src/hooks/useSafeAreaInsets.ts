import { useSafeAreaInsets as useSafeAreaInsetsContext } from "react-native-safe-area-context";

let top: number;
let right: number;
let bottom: number;
let left: number;

const useSafeAreaInsets = () => {
  const insets = useSafeAreaInsetsContext();
  if (insets.top !== top) {
    top = insets.top;
  }
  if (insets.right !== right) {
    right = insets.right;
  }
  if (insets.bottom !== bottom) {
    bottom = insets.bottom;
  }
  if (insets.left !== left) {
    left = insets.left;
  }
  return insets;
};

export default useSafeAreaInsets;
