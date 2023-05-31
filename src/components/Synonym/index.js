import { useState } from "react";
import { observer } from "mobx-react";
import { dictionaryStore } from "../../store/dictionaries";
import { Text, StyleSheet, Pressable, TextInput, View } from "react-native";

const Synonym = observer((props) => {
  const [editSynonymText, setEditSynonymText] = useState(props.title);

  const InputHandler = (enteredChange) => {
    setEditSynonymText(enteredChange);
  };

  const EditSynonymHandler = (synonymId) => {
    dictionaryStore.EditSynonym(
      synonymId,
      editSynonymText,
      props.dictionaryId,
      props.wordId
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={InputHandler}
          value={editSynonymText}
        />
        <Pressable onPress={() => EditSynonymHandler(props.id)}>
          <Text style={styles.button}>Y</Text>
        </Pressable>
        <Pressable onPress={() => dictionaryStore.DeleteSynonym(props.id)}>
          <Text style={styles.button}>X</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FBFBFB",
  },
  button: { marginRight: 20 },
});

export default Synonym;
