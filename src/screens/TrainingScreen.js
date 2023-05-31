import { useState } from "react";
import { observer } from "mobx-react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import CreateNewItems from "../components/buttons/CreateNewItems";

const TrainingScreen = observer(() => {
  const [isStart, setIsStart] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionWords, setQuestionWords] = useState();
  const [correctSynonyms, setCorrectSynonyms] = useState("");
  const [synonyms, setSynonyms] = useState();

  const route = useRoute();
  const { learnWords } = route.params;

  const GetRandom = () => {
    const questionWord =
      learnWords[Math.floor(Math.random() * learnWords.length)];
    setQuestionWords(questionWord.newWord);

    const correctSynonym = questionWord.additionalWords.map(
      (synonym) => synonym.additionalWord
    );
    setCorrectSynonyms(correctSynonym);

    // const correctSynonymId = questionWord.additionalWords.map(
    //   (synonym) => synonym.additionalWordId
    // );

    const randomSynonyms = learnWords
      .map((word) =>
        word.additionalWords.map((synonym) => synonym.additionalWord)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setSynonyms(randomSynonyms);
  };

  const renderQuestion = () => {
    return (
      <View>
        <View style={styles.counter}>
          <Text>{currentQuestionIndex + 1} </Text>
          <Text>/ {learnWords.length}</Text>
        </View>
        <View>
          <Text style={styles.question}>{questionWords}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      <Text style={styles.synonym}>{correctSynonyms}</Text>
      <Text style={styles.synonym}>{synonyms}</Text>
      <CreateNewItems title="Start training" onPress={GetRandom} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  counter: { flexDirection: "row" },
  question: { fontSize: 36, alignSelf: "center", marginTop: 60 },
  synonym: { flex: 1, backgroundColor: "red" },
});

export default TrainingScreen;
