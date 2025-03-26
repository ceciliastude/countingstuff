import { Text, View, StyleSheet, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { ModifyButton } from "./ModifyButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  index,
  editCountable,
  isEditing,
  editedName,
  setEditedName,
  saveEdit,
  deleteCountable,
}) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      {isEditing ? (
        <TextInput
          style={CommonStyles.textItem}
          value={editedName}
          onChangeText={setEditedName}
          placeholder="Edit name"
        />
      ) : (
        <Text style={CommonStyles.textItem}>{countable.name}</Text>
      )}
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountableButton
        label="+"
        submit={() => {
          changeCount(1, index);
        }}
      />
      <CountableButton
        label="-"
        submit={() => {
          changeCount(-1, index);
        }}
      />
    </View>
    <View style={styles.buttonColumn}>
      {isEditing ? (
        <ModifyButton
          label="Save"
          submit={() => {
            saveEdit();
          }}
        />
      ) : (
        <ModifyButton label="Edit" submit={() => editCountable(index)} />
      )}
      <ModifyButton
        label="Delete"
        submit={() => {
          deleteCountable(countable.name);
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});
