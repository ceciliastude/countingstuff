import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ModifyStyles } from "../styles/ModifyStyles";

export const ModifyButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={ModifyStyles.textItem}>{label}</Text>
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
