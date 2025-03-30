import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Keyboard,
  Modal,
  Button,
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
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
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
          <Button
            style={Popupstyle.buttons}
            title="OK"
            onPress={handleSubmit}
          />
          <Button style={Popupstyle.buttons} title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
