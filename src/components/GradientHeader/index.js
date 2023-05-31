import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientHeader = () => {
  return (
    <LinearGradient
      colors={["#4B5EF9", "#553CE5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    ></LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { height: 104 },
});

export default GradientHeader;
