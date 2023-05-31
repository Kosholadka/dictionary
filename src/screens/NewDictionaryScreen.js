import { useState } from "react";
import { observer } from "mobx-react";
import { dictionaryStore } from "../store/dictionaries";
import { View, TextInput, StyleSheet } from "react-native";
import CreateNewItems from "../components/buttons/CreateNewItems";

const NewDictionaryScreen = observer(({ route, navigation }) => {
  const [dictionaryName, setDictionaryName] = useState("");

  function inputHandler(enteredName) {
    setDictionaryName(enteredName);
  }

  function addDictionaryHandler() {
    dictionaryName === ""
      ? alert("Type dictionary name")
      : dictionaryStore.addDictionary(dictionaryName);

    dictionaryName !== "" ? navigation.goBack() : null;
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="New dictionary"
          style={styles.input}
          onChangeText={inputHandler}
          value={dictionaryName}
        />
      </View>
      <View>
        <CreateNewItems
          title="Create new dictionary"
          onPress={addDictionaryHandler}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
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

export default NewDictionaryScreen;
