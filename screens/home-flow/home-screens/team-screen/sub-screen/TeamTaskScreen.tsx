import React from "react";
import { View, StyleSheet } from "react-native";

import CalendarBar from "../../../../../components/CalendarBar";
import TaskTimeline from "../../../../../components/TaskTimeline";

const TeamTaskScreen: React.FC = () => {
  return (
    <>
      <View style={styles.header} />
      <CalendarBar>
        {/* <Text style={styles.emptyItemText}>Team Task Here</Text> */}
        <TaskTimeline />
      </CalendarBar>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
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
