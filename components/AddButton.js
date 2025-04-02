import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const AddButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    {typeof label === "string" ? (
      <Text style={CommonStyles.textItem}>{label}</Text>
    ) : (
      <Image source={label} style={styles.image} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 50,
    height: 50,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
