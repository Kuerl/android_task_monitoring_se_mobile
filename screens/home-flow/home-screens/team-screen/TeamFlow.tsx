import React from "react";
import { View, StyleSheet } from "react-native";

import { TeamTabList, TeamStackList } from "./TeamFlowList";
import ManageTeam from "./sub-screen/ManageTeam";
import TeamTaskScreen from "./sub-screen/TeamTaskScreen";
import AddTeamTask from "./sub-screen/AddTeamTask";
import TeamChat from "./sub-screen/TeamChat";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TeamStack = createStackNavigator<TeamStackList>();
const TeamTopTab = createMaterialTopTabNavigator<TeamTabList>();

const TeamTopComponent: React.FC = () => {
  return (
    <>
      <View style={styles.header} />
      <TeamTopTab.Navigator
        initialRouteName="TeamTask"
      >
        <TeamTopTab.Screen name="TeamTask" component={TeamTaskScreen} options={{ title: "View Tasks"}} />
        <TeamTopTab.Screen name="AddTeamTask" component={AddTeamTask} options={{ title: "Add New Tasks"}}/>
        <TeamTopTab.Screen name="TeamChat" component={TeamChat} options={{ title: "Chat Team" }} />
      </TeamTopTab.Navigator>
    </>
  );
};

const TeamFlow: React.FC = () => {
  return (
    <TeamStack.Navigator
      initialRouteName="ManageTeam"
      screenOptions={{ headerShown: false }}
    >
      <TeamStack.Screen name="ManageTeam" component={ManageTeam} />
      <TeamStack.Screen name="TeamTopTab" component={TeamTopComponent} />
    </TeamStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 18,
    backgroundColor: "white",
  }
})


export default TeamFlow;
