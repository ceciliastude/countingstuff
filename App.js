import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

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

  const saveEdit = () => {
    if (editedName.trim() !== "") {
      const newState = [...countables];
      newState[editingIndex].name = editedName;
      setCountables(newState);
      setEditingIndex(null);
      setEditedName("");
    } else {
      alert("Please enter a valid name.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
          style={styles.container}
        >
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                deleteCountable={deleteCountable}
                editCountable={editCountable}
                saveEdit={saveEdit}
                isEditing={editingIndex === index}
                editedName={editedName}
                setEditedName={setEditedName}
              />
            ))}
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} countables={countables} />
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
});
