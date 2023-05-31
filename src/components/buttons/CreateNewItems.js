import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CreateNewItems = ({ title, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={{ ...styles.container }} onPress={onPress}>
        <Text style={{ ...styles.title }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    marginHorizontal: 50,
    height: 46,
    backgroundColor: "#89BDBB",
    borderRadius: 5,
    shadowColor: "#000000",
    elevation: 6,
  },
  title: {
    color: "#FBFBFB",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateNewItems;
