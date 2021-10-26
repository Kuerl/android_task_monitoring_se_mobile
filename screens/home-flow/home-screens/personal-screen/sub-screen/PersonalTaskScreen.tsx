import React from "react";
import { View, StyleSheet } from "react-native";

import CalendarBar from "../../../../../components/CalendarBar";
import TaskTimeline from "../../../../../components/TaskTimeline";

const PersonalTaskScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <CalendarBar>
        {/* <Text style={styles.emptyItemText}>Personal Task Here</Text> */}
        <TaskTimeline />
      </CalendarBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  header: {
    paddingTop: 30,
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

export default PersonalTaskScreen;
