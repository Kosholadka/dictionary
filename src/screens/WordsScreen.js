import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import WordsList from "../components/WordsList";
import { dictionaryStore } from "../store/dictionaries";
import DeleteWord from "../components/buttons/DeleteWord";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const WordsScreen = observer(() => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const route = useRoute();
  const navigation = useNavigation();
  const { selectedDictionaryId, dictionary } = route.params;

  const DeleteDictionaryHandler = () => {
    dictionaryStore.deleteDictionary(selectedDictionaryId);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.dictionaryTitle,
      headerRight: () => (
        <TouchableOpacity onPress={DeleteDictionaryHandler}>
          <DeleteWord title={"Delete word"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // flatlist doesn't work without clg
  // console.log(dictionary.learnWords);

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        <WordsList
          searchPhrase={searchPhrase}
          data={dictionary.learnWords}
          selectedDictionaryId={selectedDictionaryId}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("NewWord", {
            selectedDictionaryId,
          })
        }
        style={styles.button}
      >
        <Image source={require("../../assets/images/icon.png")}></Image>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 36,
    marginRight: 36,
    width: 42,
    height: 42,
    backgroundColor: "#514CEF",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "flex-end",
    justifyContent: "space-around",
    shadowColor: "#000000",
    elevation: 6,
  },
});

export default WordsScreen;
