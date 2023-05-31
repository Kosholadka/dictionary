import { observer } from "mobx-react";
import WordListItem from "../WordListItem";
import { View, FlatList } from "react-native";

// the filter
const WordsList = observer(({ searchPhrase, data, selectedDictionaryId }) => {
  const renderItem = ({ item }) => {
    const synonym = item.additionalWords
      .map((word) => word.additionalWord)
      .toString();
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <WordListItem
          name={item.newWord}
          details={item.additionalWords}
          wordId={item.newWordId}
          dictionaryId={selectedDictionaryId}
        />
      );
    }
    // filter of the name
    if (
      item.newWord
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <WordListItem
          name={item.newWord}
          details={item.additionalWords}
          wordId={item.newWordId}
        />
      );
    }
    // filter of the description
    if (
      synonym
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <WordListItem
          name={item.newWord}
          details={item.additionalWords}
          wordId={item.newWordId}
        />
      );
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.newWordId}
      />
    </View>
  );
});

export default WordsList;
