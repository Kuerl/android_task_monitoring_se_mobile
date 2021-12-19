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

import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Provider as TeamProvider } from "../../../../context/TeamContext";
import { Provider as TeamTaskProvider } from "../../../../context/TeamTaskContext";

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
      <Text style={styles.teamName}>{props.teamName}</Text>
      <DrawerItemList {...props} />
    </DrawerContent>
  );
}

type TeamStackProps = StackScreenProps<TeamStackList, "TeamBottomTab">;
const TeamDrawerComponent: React.FC<TeamStackProps> = ({ route }) => {
  return (
    <TeamDrawer.Navigator
      initialRouteName="TeamTask"
      // screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} teamName={route.params.teamName} />
      )}
    >
      <TeamDrawer.Screen
        name="TeamTask"
        component={TeamTaskScreen}
        options={{ title: "View Team Tasks" }}
        initialParams={route.params}
      />
      <TeamDrawer.Screen
        name="AddTeamTask"
        component={AddTeamTask}
        options={{ title: "Create Team Tasks" }}
        initialParams={route.params}
      />
      <TeamDrawer.Screen
        name="TeamChat"
        component={TeamChat}
        options={{ title: "Team Chat" }}
        initialParams={route.params}
      />
      <TeamDrawer.Screen
        name="TeamInfo"
        component={TeamInfo}
        options={{ title: "Your Team Information" }}
        initialParams={route.params}
      />
    </TeamDrawer.Navigator>
  );
};

const TeamFlow: React.FC = () => {
  return (
    <TeamProvider>
      <TeamTaskProvider>
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
      </TeamTaskProvider>
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
