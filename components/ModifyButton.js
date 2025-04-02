import { TouchableOpacity, StyleSheet, Image } from "react-native";

export const ModifyButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Image source={label} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 6,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  textItem: {
    fontSize: 15,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
});
