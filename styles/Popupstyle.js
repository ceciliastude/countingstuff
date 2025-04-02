//Layout for the popup screen
import { StyleSheet } from "react-native";

export const Popupstyle = StyleSheet.create({
  container: {
    padding: 10,
    width: "92%",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
    position: "absolute",
  },
  textTitle: {
    fontSize: 20,
    padding: 10,
    textAlign: "left",
  },
  buttons: {
    padding: 10,
    width: "48%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    backgroundColor: "lightblue",
  },
});
