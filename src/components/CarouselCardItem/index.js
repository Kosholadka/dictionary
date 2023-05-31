import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";

// navigation doesn't word without this s***
const CarouselCardItem = ({ item, index }) => {
  return <DictionaryItem item={item} index={index} />;
};

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const DictionaryItem = observer(({ item, index }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container} key={index}>
      <View style={styles.dictionaryInfoContainer}>
        <Text style={styles.dictionaryInfo}>{item.dictionaryName}</Text>
        {item.learnWords.length > 0 ? (
          <Text>{item.learnWords.length} words</Text>
        ) : (
          <Text>There is no words yet</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={
            item.learnWords.length >= 5
              ? styles.trainingButtonActive
              : styles.trainingButtonInactive
          }
          onPress={
            item.learnWords.length >= 5
              ? () =>
                  navigation.navigate("Quiz", {
                    learnWords: item.learnWords,
                  })
              : null
          }
        >
          <Text style={styles.trainingButtonText}>Training</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.wordsButton}
          onPress={() =>
            navigation.navigate("Words", {
              dictionary: item,
              dictionaryTitle: item.dictionaryName,
              selectedDictionaryId: item.dictionaryId,
            })
          }
        >
          <Text style={styles.wordsButtonText}>Words</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    borderRadius: 20,
    justifyContent: "space-between",
    height: 156,
    marginTop: 100,
    borderWidth: 1,
    borderColor: "lightgrey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
  },
  dictionaryInfoContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  dictionaryInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  trainingButtonActive: {
    backgroundColor: "#EA2C71",
    width: 117,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000000",
    elevation: 6,
  },
  trainingButtonInactive: {
    backgroundColor: "lightgray",
    width: 117,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000000",
  },
  trainingButtonText: {
    color: "#FBFBFB",
    fontWeight: "bold",
  },
  wordsButton: {
    width: 117,
    height: 26,
    borderWidth: 3,
    borderColor: "#EA2C71",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  wordsButtonText: { fontWeight: "bold" },
});

export default CarouselCardItem;
