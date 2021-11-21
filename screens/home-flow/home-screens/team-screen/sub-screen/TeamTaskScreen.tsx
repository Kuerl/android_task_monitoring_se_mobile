import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-elements";

import CalendarBar from "../../../../../components/CalendarBar";
import TaskTimeline from "../../../../../components/TaskTimeline";
import { TeamTabList } from "../TeamFlowList";

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "TeamTask">;

const TeamTaskScreen: React.FC<TeamDrawerProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <CalendarBar>
        {/* <Text style={styles.emptyItemText}>Team Task Here</Text> */}
        <TaskTimeline />
      </CalendarBar>
      <FAB
        color="#439DE4"
        icon={{ type: "feather", name: "plus", color: "white" }}
        placement="right"
        onPress={() => navigation.navigate("AddTeamTask")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  header: {
    // paddingTop: 35,
    backgroundColor: "white",
  },
  emptyItemText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default TeamTaskScreen;
