import { TouchableOpacity, StyleSheet, Image } from "react-native";

export const AddButton = ({ label, submit }) => (
  <TouchableOpacity
    style={[styles.button, styles.buttonShadow]}
    onPress={submit}
  >
    <Image source={label} style={styles.image} />
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
  buttonShadow: {
    shadowColor: "black",
    elevation: 5,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
