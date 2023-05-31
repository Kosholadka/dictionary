import { Button } from "react-native";
import WordScreen from "../screens/WordScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import WordsScreen from "../screens/WordsScreen";
import NewWordScreen from "../screens/NewWordScreen";
import GradientHeader from "../components/GradientHeader";
import { NavigationContainer } from "@react-navigation/native";
import NewDictionaryScreen from "../screens/NewDictionaryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ellipse, Svg } from "react-native-svg";

const Stack = createNativeStackNavigator();

// const LogoTitle = () => {
//   return (
//     <View style={{ width: 550, height: 250 }}>
//       <Svg>
//         <Ellipse
//           cx="52.423"
//           cy="-17.8826"
//           rx="462"
//           ry="196.5"
//           transform="rotate(1.95133 52.423 -17.8826)"
//           fill="#553CE5"
//         />
//       </Svg>
//     </View>
//   );
// };

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackground: () => <GradientHeader />,
          headerTitleAlign: "center",
          headerTintColor: "#FBFBFB",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen
          name="My dictionaries"
          component={HomeScreen}
          // options={{
          //   headerTitle: (props) => <LogoTitle {...props} />,
          //   headerStyle: {
          //     backgroundColor: "transparent",
          //   },
          // }}
        />
        <Stack.Screen
          name="NewDictionary"
          component={NewDictionaryScreen}
          options={{ title: "New dictionary" }}
        />
        <Stack.Screen
          name="Words"
          component={WordsScreen}
          options={({ navigation, route }) => ({
            headerRight: () => <Button title={"Press me"}></Button>,
          })}
        />
        <Stack.Screen
          name="Word"
          component={WordScreen}
          options={({ navigation, route }) => ({
            headerRight: () => <Button title={"Press me"}></Button>,
          })}
        />
        <Stack.Screen
          name="NewWord"
          component={NewWordScreen}
          options={{ title: "New word" }}
        />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
