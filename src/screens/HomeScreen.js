import { useEffect } from "react";
import { observer } from "mobx-react";
import { View, Text, StyleSheet } from "react-native";
import { dictionaryStore } from "../store/dictionaries";
import CarouselCards from "../components/CarouselCards";
import { useNavigation } from "@react-navigation/native";
import AddDictionary from "../components/buttons/AddDictionary";

const HomeScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    dictionaryStore.loadData();
  }, []); // load the data when the component mounts

  return (
    <View style={styles.container}>
      {dictionaryStore.countDictionaries === undefined ||
      dictionaryStore.countDictionaries === 0 ? (
        <View style={styles.emptyScreenTextContainer}>
          <Text style={styles.emptyScreenText}>
            Create your first dictionary
          </Text>
        </View>
      ) : (
        <CarouselCards />
      )}
      <AddDictionary
        title="Add new dictionary"
        onPress={() => navigation.navigate("NewDictionary")}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  emptyScreenTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyScreenText: { color: "#D5D5D5", fontSize: 20 },
});

export default HomeScreen;
