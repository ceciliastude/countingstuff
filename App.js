import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { ModifyButton } from "./components/ModifyButton";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { EmptyPage } from "./styles/EmptyPage";
import { Layout } from "./styles/Layout";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  //Function that changes the index/count of an entry. Math.max prevents the entry for going into negatives
  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count = Math.max(0, newState[index].count + amount);
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };
  const deleteCountable = (name) => {
    const newState = countables.filter((countable) => countable.name !== name);
    setCountables(newState);
  };

  const editCountable = (index) => {
    setEditingIndex(index);
    setEditedName(countables[index].name);
  };
  //Function that saves the changes of an edited entry. Also checks if the edited entry is a duplicate/empty entry.
  const saveEdit = () => {
    const trimmedName = editedName.trim();

    if (!trimmedName) {
      alert("Please enter a valid name.");
      return;
    }
    const isDuplicate = countables.some(
      (item, index) =>
        index !== editingIndex &&
        item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert("A row with this name already exists.");
      return;
    }

    const newState = [...countables];
    newState[editingIndex].name = trimmedName;
    setCountables(newState);
    setEditingIndex(null);
    setEditedName("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
          style={styles.container}
        >
          {/* Implementation of the header. Is inside the Scrollview to prevent the keyboard messing up the layout.*/}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={Layout.background}>
              <Text style={Layout.headerText}>All Counters</Text>
              <ModifyButton
                label={require("./assets/editIcon.png")}
                submit={() => setIsModifyMode((prev) => !prev)}
              />
            </View>
            {/* Implementation of the empty interface*/}
            {countables.length === 0 ? (
              <View style={EmptyPage.container}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("./assets/notes-icon.png")}
                />
                <Text style={EmptyPage.textItem}>No Items Added</Text>
                <Text style={EmptyPage.subText}>
                  Add your first item to start counting!
                </Text>
              </View>
            ) : (
              countables.reduce((rows, _, index) => {
                /* Implementation of entries.*/
                if (index % 2 === 0) {
                  rows.push(
                    <View key={index} style={styles.rowContainer}>
                      <CountableRow
                        countable={countables[index]}
                        key={countables[index].name}
                        changeCount={changeCount}
                        index={index}
                        deleteCountable={deleteCountable}
                        editCountable={editCountable}
                        saveEdit={saveEdit}
                        isEditing={editingIndex === index}
                        editedName={editedName}
                        setEditedName={setEditedName}
                        isModifyMode={isModifyMode}
                      />
                      {/* Sorts entries to the right side. This makes the layout have 2 entries next to each other.*/}
                      {countables[index + 1] && (
                        <CountableRow
                          countable={countables[index + 1]}
                          key={countables[index + 1].name}
                          changeCount={changeCount}
                          index={index + 1}
                          deleteCountable={deleteCountable}
                          editCountable={editCountable}
                          saveEdit={saveEdit}
                          isEditing={editingIndex === index + 1}
                          editedName={editedName}
                          setEditedName={setEditedName}
                          isModifyMode={isModifyMode}
                        />
                      )}
                    </View>
                  );
                }
                return rows;
              }, [])
            )}
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} countables={countables} />
          {/* Implementation of add button, which is implemented in addRow*/}
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
