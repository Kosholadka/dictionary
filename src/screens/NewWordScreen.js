import { useState } from "react";
import { observer } from "mobx-react";
import { dictionaryStore } from "../store/dictionaries";
import { View, TextInput, StyleSheet } from "react-native";
import CreateNewItems from "../components/buttons/CreateNewItems";

const NewWordScreen = observer(({ route, navigation }) => {
  const { selectedDictionaryId } = route.params;

  const [newWord, setNewWord] = useState("");
  const [newSynonym, setSynonym] = useState("");

  function wordInputHandler(enteredWord) {
    setNewWord(enteredWord);
  }

  function synonymInputHandler(enteredSynonym) {
    setSynonym(enteredSynonym);
  }

  function NewAddWordHandler() {
    newWord === "" && newSynonym === ""
      ? alert("Complete the fields!")
      : newWord === ""
      ? alert("Type word!")
      : newSynonym === ""
      ? alert("Type synonym!")
      : dictionaryStore.AddWord(newWord, newSynonym, selectedDictionaryId);

    newWord !== "" && newSynonym !== "" ? navigation.goBack() : null;
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="New word"
          onChangeText={wordInputHandler}
          value={newWord}
        />
        <TextInput
          style={styles.input}
          placeholder="Additional word"
          onChangeText={synonymInputHandler}
          value={newSynonym}
        />
      </View>
      <CreateNewItems title="Create new word" onPress={NewAddWordHandler} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FBFBFB",
  },
});

export default NewWordScreen;
