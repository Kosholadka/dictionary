import { observer } from "mobx-react";
import React, { useState } from "react";
import { dictionaryStore } from "../../store/dictionaries";
import { Text, StyleSheet, Pressable, View, TextInput } from "react-native";

const AddSynonym = observer((props) => {
  const [isExpandable, setExpandable] = useState(false);
  const [newSynonymText, setSynonymText] = useState("");

  const wordId = props.wordId;
  const dictionaryId = props.dictionaryId;

  function StartExpandHandler() {
    setExpandable(true);
    props.onStartExpand(true);
  }

  function EndExpandHandler() {
    setExpandable(false);
    props.onEndExpand(false);
    setSynonymText("");
  }

  function inputHandler(enteredSynonym) {
    setSynonymText(enteredSynonym);
  }

  const NewSynonymHandler = () => {
    newSynonymText === ""
      ? alert("Type synonym!")
      : dictionaryStore.AddSynonym(newSynonymText, wordId, dictionaryId);

    newSynonymText !== "" ? EndExpandHandler() : null;
    setSynonymText("");
  };

  return (
    <View>
      <Pressable onPress={StartExpandHandler}>
        {!isExpandable ? (
          <Text style={styles.content}>Add additional word</Text>
        ) : (
          <>
            <View style={styles.input}>
              <TextInput
                placeholder="Additional word"
                onChangeText={inputHandler}
                value={newSynonymText}
              />
              <Pressable onPress={EndExpandHandler}>
                <Text>X</Text>
              </Pressable>
            </View>
            <Pressable onPress={NewSynonymHandler}>
              <Text style={styles.content}>Add synonym</Text>
            </Pressable>
          </>
        )}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FBFBFB",
  },
  content: {
    color: "#56ADED",
    marginHorizontal: 15,
    marginTop: 5,
    padding: 10,
  },
});

export default AddSynonym;
