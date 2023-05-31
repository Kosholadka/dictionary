import { useState } from "react";
import Synonym from "../Synonym";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";

const WordListItem = observer((props) => {
  const navigation = useNavigation();

  const [isExpandable, setExpandable] = useState(false);

  function StartExpandHandler() {
    setExpandable(true);
  }

  function EndExpendHandler() {
    setExpandable(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={!isExpandable ? StartExpandHandler : EndExpendHandler}
        >
          <Text style={isExpandable ? styles.expandableText : styles.text}>
            {props.name}
          </Text>
        </Pressable>
        {isExpandable ? (
          <Text>
            <FlatList
              data={props.details}
              renderItem={({ item }) => (
                <Text style={styles.text}>{item.additionalWord}</Text>
              )}
            ></FlatList>
          </Text>
        ) : null}
      </View>
      {isExpandable ? (
        <Pressable
          onPress={() =>
            navigation.navigate("Word", {
              wordId: props.wordId,
              word: props.name,
              synonyms: props.details,
              dictionaryId: props.dictionaryId,
              onEndExpand: EndExpendHandler,
            })
          }
        >
          <Image
            source={require("../../../assets/images/edit.png")}
            style={styles.edit}
          ></Image>
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#FBFBFB",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text: { fontSize: 16 },
  expandableText: { fontSize: 16, color: "red", fontWeight: "bold" },
  edit: {
    width: 25,
    height: 25,
  },
});

export default WordListItem;
