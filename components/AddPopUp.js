/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Keyboard,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { CommonStyles } from "../styles/CommonStyles";
import { Popupstyle } from "../styles/Popupstyle";

export const AddPopUp = ({ visible, onClose, addNewCountable, countables }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert("Invalid Input", "Row name cannot be empty.");
      return;
    }

    if (
      countables.some(
        (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      Alert.alert("Duplicate Entry", "A row with this name already exists.");
      return;
    }
    Keyboard.dismiss();
    addNewCountable(trimmedName);
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={Popupstyle.container}>
          <View style={Popupstyle.modalContent}>
            <Text style={Popupstyle.textTitle}>Add a new entry</Text>
            <View style={CommonStyles.row}>
              <TextInput
                placeholder="Enter name"
                onChangeText={setName}
                value={name}
                style={Popupstyle.input}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[Popupstyle.buttons, styles.okButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[Popupstyle.buttons, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: "50%",
  },
});
