import React from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-elements";

import CalendarBar from "../../../../../components/CalendarBar";
import TaskTimeline from "../../../../../components/TaskTimeline";
import { PersonalTabList } from "../PersonalTabList";
import { DrawerScreenProps } from "@react-navigation/drawer";

type PersonalDrawerProps = DrawerScreenProps<PersonalTabList, "PersonalTask">;

const PersonalTaskScreen: React.FC<PersonalDrawerProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <CalendarBar>
        {/* <Text style={styles.emptyItemText}>Personal Task Here</Text> */}
        <TaskTimeline />
      </CalendarBar>
      <FAB
        // title="Create Team"
        color="#439DE4"
        icon={{ type: "feather", name: "plus", color: "white" }}
        placement="right"
        onPress={() => navigation.navigate("AddPersonalTask")}
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
    // paddingTop: 30,
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
