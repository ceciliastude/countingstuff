import { useState } from "react";
import { View, TextInput, Alert } from "react-native";

import { CountableButton } from "./CountableButton";
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

    addNewCountable(trimmedName);
    setName("");
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} value={name} />
      <CountableButton label="Add" submit={handleSubmit} />
    </View>
  );
};
