import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackList } from "../../HomeStackList";

type DecisionProps = StackScreenProps<HomeStackList, "Decision">;

const DecisionScreen: React.FC<DecisionProps> = ({ navigation }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Personal")}
      >
        <Text style={styles.text}>Personal Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Team")}
      >
        <Text style={styles.text}>Team Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Info")}
      >
        <Text style={styles.text}>Your Information</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    marginHorizontal: 30,
    height: 60,
    marginVertical: 40,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#3bcdf9",
    borderColor: "#2E3191",
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default DecisionScreen;
