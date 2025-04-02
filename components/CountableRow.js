import { Text, View, StyleSheet, TextInput, Alert } from "react-native";

import { CountableButton } from "./CountableButton";
import { ModifyButton } from "./ModifyButton";
import { CommonStyles } from "../styles/CommonStyles";

const deleteConfirmation = (name, deleteCountable) => {
  Alert.alert("Confirm Delete", `Are you sure you want to delete ${name}?`, [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      onPress: () => deleteCountable(name),
      style: "destructive",
    },
  ]);
};

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
  isModifyMode,
}) => (
  <View style={styles.entryColumn}>
    <View style={styles.nameColumn}>
      {isEditing ? (
        <TextInput
          style={CommonStyles.textItem}
          value={editedName}
          onChangeText={setEditedName}
          placeholder="Edit name"
        />
      ) : (
        <Text
          style={styles.nameColumn}
          numberOfLines={1}
          ellipsizeMode="tail"
          onPress={() => Alert.alert(countable.name)}
        >
          {countable.name}
        </Text>
      )}
    </View>
    <View style={styles.container}>
      <View style={styles.scoreColumn}>
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
        {isModifyMode && (
          <>
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
                deleteConfirmation(countable.name, deleteCountable);
              }}
            />
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  entryColumn: {
    padding: 10,
    width: "50%",
    margin: 1,
  },
  nameColumn: {
    flex: 1,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 5.1,
    borderRadius: 10,
    width: "100%",
    borderColor: "lightblue",
  },
  scoreColumn: {
    flex: 0.8,
    padding: 10,
    alignItems: "center",
  },
  buttonColumn: {
    align: "center",
    flexDirection: "row",
  },
});
