import React from "react";

import { TeamTabList, TeamStackList } from "./TeamFlowList";
import ManageTeam from "./sub-screen/ManageTeam";
import TeamTaskScreen from "./sub-screen/TeamTaskScreen";
import AddTeamTask from "./sub-screen/AddTeamTask";
import TeamChat from "./sub-screen/TeamChat";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const TeamStack = createStackNavigator<TeamStackList>();
const TeamDrawer = createDrawerNavigator<TeamTabList>();

const TeamBottomComponent: React.FC = () => {
  return (
    <TeamDrawer.Navigator
      initialRouteName="TeamTask"
      screenOptions={{ headerShown: false }}
    >
      <TeamDrawer.Screen
        name="TeamTask"
        component={TeamTaskScreen}
        options={{ title: "View Team Tasks" }}
      />
      <TeamDrawer.Screen
        name="AddTeamTask"
        component={AddTeamTask}
        options={{ title: "Create Team Tasks" }}
      />
      <TeamDrawer.Screen
        name="TeamChat"
        component={TeamChat}
        options={{ title: "Team Chat" }}
      />
    </TeamDrawer.Navigator>
  );
};

const TeamFlow: React.FC = () => {
  return (
    <TeamStack.Navigator
      initialRouteName="ManageTeam"
      screenOptions={{ headerShown: false }}
    >
      <TeamStack.Screen name="ManageTeam" component={ManageTeam} />
      <TeamStack.Screen
        name="TeamBottomTab"
        component={TeamBottomComponent}
        options={{ gestureEnabled: false }}
      />
    </TeamStack.Navigator>
  );
};

export default TeamFlow;
