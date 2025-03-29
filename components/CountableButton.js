import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={CommonStyles.textItem}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "49.4%",
    padding: 10,
    margin: 0.5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
