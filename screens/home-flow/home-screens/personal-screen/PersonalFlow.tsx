import React from "react";
import { StyleSheet } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";

const PersonalBottomTab = createMaterialBottomTabNavigator<PersonalTabList>();

const PersonalFlow: React.FC = () => {
  return (
    <PersonalBottomTab.Navigator
      initialRouteName="PersonalTask"
      barStyle={styles.tabBar}
      shifting={true}
    >
      <PersonalBottomTab.Screen
        name="PersonalTask"
        component={PersonalTaskScreen}
        options={{
          tabBarLabel: "View Personal Tasks",
          tabBarIcon: "file-document",
          tabBarColor: "#C9E7F8",
        }}
      />
      <PersonalBottomTab.Screen
        name="AddPersonalTask"
        component={AddPersonalTask}
        options={{
          tabBarLabel: "Create Personal Tasks",
          tabBarIcon: "contacts",
          tabBarColor: "#9FD5C9",
        }}
      />
    </PersonalBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
});

export default PersonalFlow;
