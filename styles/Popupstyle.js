import { StyleSheet } from "react-native";

export const Popupstyle = StyleSheet.create({
  container: {
    marginVertical: "70%",
    marginHorizontal: 15,
    padding: 10,
    flex: 1,
    alignItems: "start",
    width: "92%",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
  },
  textTitle: {
    fontSize: 20,
    padding: 10,
    textAlign: "left",
  },
  buttons: {
    padding: 10,
    alignItems: "stretch",
  },
});
