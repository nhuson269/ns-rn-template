import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
  },
  statusBar: {},
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    left: 16,
    right: 76,
  },
});
