import { useState } from "react";
import { View, TextInput, Alert, Keyboard } from "react-native";

import { AddButton } from "./AddButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, countables }) => {
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
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} value={name} />
      <AddButton
        label={require("../assets/add-icon.png")}
        submit={handleSubmit}
      />
    </View>
  );
};
