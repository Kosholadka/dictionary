import { useState } from "react";
import { observer } from "mobx-react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Quiz = observer(({ route, navigation }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wordIsKnown, setWordIsKnown] = useState(false);

  const questions = route.params.learnWords;

  const WordIsKnownHandler = () => {
    setWordIsKnown(true);
  };

  const WordIsNotKnownHandler = () => {
    setActiveQuestion(activeQuestion + 1);
  };

  const ApproveHandler = () => {
    setActiveQuestion(activeQuestion + 1);
    setWordIsKnown(false);
  };

  const DontApproveHandler = () => {
    setActiveQuestion(activeQuestion + 1);
    setWordIsKnown(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.question}>{questions[activeQuestion].newWord}</Text>
        {wordIsKnown
          ? questions[activeQuestion].additionalWords.map((word) => (
              <Text style={styles.word}>{word.additionalWord}</Text>
            ))
          : null}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={wordIsKnown ? DontApproveHandler : WordIsNotKnownHandler}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E48787" : "#E65656",
            },
            styles.button,
          ]}
        >
          {wordIsKnown ? <Text>Not approve</Text> : <Text>Don't remember</Text>}
        </Pressable>
        <Pressable
          onPress={wordIsKnown ? ApproveHandler : WordIsKnownHandler}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#89BDBB" : "#3BA874",
            },
            styles.button,
          ]}
        >
          {wordIsKnown ? <Text>Approve</Text> : <Text>Remember</Text>}
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
  question: {
    fontSize: 44,
    alignSelf: "center",
    marginTop: 90,
    marginBottom: 40,
  },
  word: { fontSize: 20, alignSelf: "center" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 90,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    height: 70,
    width: 150,
    borderRadius: 5,
    shadowColor: "#000000",
    elevation: 6,
  },
});

export default Quiz;
