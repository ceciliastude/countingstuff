import { Text, View, StyleSheet, TextInput, Alert } from "react-native";

import { CountableButton } from "./CountableButton";
import { ModifyButton } from "./ModifyButton";
import { CommonStyles } from "../styles/CommonStyles";

//deleteConfirmation shows an alert which asks if the user really wants to delete the entry. If the user presses yes, the entry gets deleted from the list.
//Cancel just cancels the operation
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
  //entryColumn is the layout of each entry. Everytime a new entry is added, everything here will be included in that entry.
  <View style={styles.entryColumn}>
    <View style={styles.nameColumn}>
      {isEditing ? ( //Checks if you're currently editing the name or not.
        <TextInput
          style={CommonStyles.textItem}
          value={editedName}
          onChangeText={setEditedName}
          placeholder="Edit name"
        />
      ) : (
        //If an entry exceeds the character limit, the string will end with "..."
        <Text
          style={styles.nameColumn}
          numberOfLines={1}
          ellipsizeMode="tail"
          onPress={() => Alert.alert(countable.name)} // You can see the full name by clicking the entry's name. An alert will pop up which shows the entire name.
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
    </View>
    {/*This is the edit/delete buttons. They will show when you press the modify button on top of the screen.*/}
    {/*The edit button will increase the text size to indicate the user that you can press the text to edit. Then the keyboard will show.*/}
    <View style={styles.buttonColumn}>
      {isModifyMode /*If the user is currently editing, the "Edit" text will change to "Save"*/ && (
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
          {/*The delete button will execute deleConfirmation, a confirmation check to prevent accidentaly deleting an entry.*/}
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
    justifyContent: "center",
    flexDirection: "row",
  },
});
