import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const ModifyButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={CommonStyles.textItem}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
});
