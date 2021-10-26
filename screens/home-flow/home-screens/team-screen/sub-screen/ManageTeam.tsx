import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { TeamStackList } from "../TeamFlowList";

type TeamStackProps = StackScreenProps<TeamStackList, "ManageTeam">;

const ManageTeam: React.FC<TeamStackProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("TeamBottomTab")}
      >
        <Text style={styles.text}>Software Engineer Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginHorizontal: 30,
    height: 60,
    marginVertical: 15,
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

export default ManageTeam;
