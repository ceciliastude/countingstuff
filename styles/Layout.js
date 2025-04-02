//General layout of the app
import { StyleSheet } from "react-native";

export const Layout = StyleSheet.create({
  background: {
    backgroundColor: "lightblue",
    height: 80,
    alignItems: "left",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 24,
    padding: 20,
    fontWeight: "bold",
    marginBottom: -10,
  },
});
