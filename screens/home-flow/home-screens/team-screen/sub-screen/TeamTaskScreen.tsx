import React from "react";
import { Text, StyleSheet } from "react-native";

import CalendarBar from "../../../../../components/CalendarBar";

const TeamTaskScreen: React.FC = () => {
  return (
    <CalendarBar>
      <Text style={styles.emptyItemText}>Team Task Here</Text>
    </CalendarBar>
  );
};

const styles = StyleSheet.create({
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
