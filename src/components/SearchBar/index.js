import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Image
        source={require("../../../assets/images/searchIcon.png")}
        style={styles.icon}
      ></Image> */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 100,
    backgroundColor: "#FBFBFB",
    height: 34,
    paddingLeft: 10,
    margin: 20,
  },
  icon: { position: "absolute", left: 15 },
});

export default SearchBar;
