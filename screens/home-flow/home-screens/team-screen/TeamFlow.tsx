import React from "react";
import { Text, StyleSheet } from "react-native";

import { Divider } from "react-native-elements";

import { TeamTabList, TeamStackList } from "./TeamFlowList";
import ManageTeam from "./sub-screen/ManageTeam";
import TeamTaskScreen from "./sub-screen/TeamTaskScreen";
import AddTeamTask from "./sub-screen/AddTeamTask";
import TeamChat from "./sub-screen/TeamChat";
import TeamInfo from "./sub-screen/TeamInfo";
import CreateTeam from "./sub-screen/CreateTeam";
import DrawerContent from "../../../../components/DrawerContent";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Provider as TeamProvider } from "../../../../context/TeamContext";

const TeamStack = createStackNavigator<TeamStackList>();
const TeamDrawer = createDrawerNavigator<TeamTabList>();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContent>
      <DrawerItem
        label="Manage All Teams"
        onPress={() => props.navigation.navigate("ManageTeam")}
      />
      <DrawerItem
        label="Create New Team"
        onPress={() => props.navigation.navigate("CreateTeam")}
      />
      <Divider style={styles.subDivider} />
      <Text style={styles.teamName}>Software Engineer Team</Text>
      <DrawerItemList {...props} />
    </DrawerContent>
  );
}

const TeamDrawerComponent: React.FC = () => {
  return (
    <TeamDrawer.Navigator
      initialRouteName="TeamTask"
      // screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      <TeamDrawer.Screen
        name="TeamInfo"
        component={TeamInfo}
        options={{ title: "Your Team Information" }}
      />
    </TeamDrawer.Navigator>
  );
};

const TeamFlow: React.FC = () => {
  return (
    <TeamProvider>
      <TeamStack.Navigator
        initialRouteName="ManageTeam"
        screenOptions={{ headerShown: false }}
      >
        <TeamStack.Screen name="ManageTeam" component={ManageTeam} />
        <TeamStack.Screen name="CreateTeam" component={CreateTeam} />
        <TeamStack.Screen
          name="TeamBottomTab"
          component={TeamDrawerComponent}
          options={{ gestureEnabled: false }}
        />
      </TeamStack.Navigator>
    </TeamProvider>
  );
};

const styles = StyleSheet.create({
  teamName: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },
  subDivider: {
    width: "85%",
    alignSelf: "flex-end",
  },
});

export default TeamFlow;
