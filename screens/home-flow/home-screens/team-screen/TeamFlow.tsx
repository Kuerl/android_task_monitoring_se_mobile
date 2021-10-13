import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TeamTabList, TeamStackList } from "./TeamFlowList";
import ManageTeam from "./sub-screen/ManageTeam";
import TeamTaskScreen from "./sub-screen/TeamTaskScreen";
import AddTeamTask from "./sub-screen/AddTeamTask";
import TeamChat from "./sub-screen/TeamChat";
import { createStackNavigator } from "@react-navigation/stack";

const TeamBottomTab = createBottomTabNavigator<TeamTabList>();
const TeamStack = createStackNavigator<TeamStackList>();

const TeamBottomComponent: React.FC = () => {
  return (
    <TeamBottomTab.Navigator
      initialRouteName="TeamTask"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TeamBottomTab.Screen name="TeamTask" component={TeamTaskScreen} />
      <TeamBottomTab.Screen name="AddTeamTask" component={AddTeamTask} />
      <TeamBottomTab.Screen name="TeamChat" component={TeamChat} />
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
      <TeamStack.Screen name="TeamBottom" component={TeamBottomComponent} />
    </TeamStack.Navigator>
  );
};

export default TeamFlow;
