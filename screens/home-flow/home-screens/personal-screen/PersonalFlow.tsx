import React from "react";
import { View, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";

const PersonalTopTab = createMaterialTopTabNavigator<PersonalTabList>();

const PersonalFlow: React.FC = () => {
  return (
    <>
      <View style={styles.header} />
      <PersonalTopTab.Navigator initialRouteName="PersonalTask">
        <PersonalTopTab.Screen
          name="PersonalTask"
          component={PersonalTaskScreen}
          options={{ title: "View Tasks" }}
        />
        <PersonalTopTab.Screen
          name="AddPersonalTask"
          component={AddPersonalTask}
          options={{ title: "Add New Tasks" }}
        />
      </PersonalTopTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 28,
    backgroundColor: "white",
  }
})

export default PersonalFlow;
