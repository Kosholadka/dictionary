import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AddDictionary = ({ title, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient colors={["#4B5EF9", "#553CE5"]} style={styles.button}>
          {/* Problem is in the LinearGradient, maybe need to change style and set it for each component */}
          <Text style={styles.content}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 298,
    height: 46,
    borderRadius: 100,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000000",
    elevation: 6,
  },
  content: {
    color: "#FBFBFB",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddDictionary;
