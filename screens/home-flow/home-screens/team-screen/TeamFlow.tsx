import React from "react";
import { View, StyleSheet } from "react-native";

import { TeamTabList, TeamStackList } from "./TeamFlowList";
import ManageTeam from "./sub-screen/ManageTeam";
import TeamTaskScreen from "./sub-screen/TeamTaskScreen";
import AddTeamTask from "./sub-screen/AddTeamTask";
import TeamChat from "./sub-screen/TeamChat";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const TeamStack = createStackNavigator<TeamStackList>();
const TeamTopTab = createMaterialTopTabNavigator<TeamTabList>();
const TeamBottomTab = createMaterialBottomTabNavigator<TeamTabList>();

const TeamBottomComponent: React.FC = () => {
  return (
    <TeamBottomTab.Navigator
      initialRouteName="TeamTask"
      barStyle={styles.tabBar}
      shifting={true}
    >
      <TeamBottomTab.Screen
        name="TeamTask"
        component={TeamTaskScreen}
        options={{
          tabBarLabel: "View Team Tasks",
          tabBarIcon: "file-document",
          tabBarColor: "#C9E7F8",
        }}
      />
      <TeamBottomTab.Screen
        name="AddTeamTask"
        component={AddTeamTask}
        options={{
          tabBarLabel: "Create Team Tasks",
          tabBarIcon: "contacts",
          tabBarColor: "#9FD5C9",
        }}
      />
      <TeamBottomTab.Screen
        name="TeamChat"
        component={TeamChat}
        options={{
          tabBarLabel: "Team Chat",
          tabBarIcon: "image-album",
          tabBarColor: "#F7EAA2",
        }}
      />
    </TeamBottomTab.Navigator>
  );
};

const TeamFlow: React.FC = () => {
  return (
    <TeamStack.Navigator
      initialRouteName="ManageTeam"
      screenOptions={{ headerShown: false }}
    >
      <TeamStack.Screen name="ManageTeam" component={ManageTeam} />
      <TeamStack.Screen name="TeamBottomTab" component={TeamBottomComponent} />
    </TeamStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
});

export default TeamFlow;
