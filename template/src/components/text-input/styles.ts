import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    color: "red",
  },
  btEye: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    right: 0,
  },
});
