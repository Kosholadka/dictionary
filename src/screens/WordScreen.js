import { observer } from "mobx-react";
import Synonym from "../components/Synonym";
import { useEffect, useState } from "react";
import { dictionaryStore } from "../store/dictionaries";
import DeleteWord from "../components/buttons/DeleteWord";
import AddSynonym from "../components/buttons/AddSynonym";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CreateNewItems from "../components/buttons/CreateNewItems";

const WordScreen = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isExpandable, setExpandable] = useState(false);

  const DeleteWordHandler = () => {
    dictionaryStore.DeleteWord(route.params.wordId);
    navigation.goBack();
  };

  function StartExpandHandler() {
    setExpandable(true);
  }

  function EndExpandHandler() {
    setExpandable(false);
  }

  useEffect(() => {
    navigation.setOptions({
      title: route.params.word,
      headerRight: () => (
        <TouchableOpacity onPress={DeleteWordHandler}>
          <DeleteWord title={"Delete word"} />
        </TouchableOpacity>
      ),
    });
    route.params.onEndExpand();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={route.params.synonyms}
          renderItem={({ item }) => (
            <Synonym
              title={item.additionalWord}
              id={item.additionalWordId}
              wordId={route.params.wordId}
              dictionaryId={route.params.dictionaryId}
            />
          )}
        />
        <AddSynonym
          onStartExpand={StartExpandHandler}
          onEndExpand={EndExpandHandler}
          wordId={route.params.wordId}
          dictionaryId={route.params.dictionaryId}
        />
      </View>
      {/* <CreateNewItems title="Save changes" /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default WordScreen;
