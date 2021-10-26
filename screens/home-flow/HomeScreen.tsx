import React from "react";
import { StyleSheet } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreensList } from "./HomeScreensList";

import PersonalFlow from "./home-screens/personal-screen/PersonalFlow";
import TeamFlow from "./home-screens/team-screen/TeamFlow";
import InfoScreen from "./home-screens/info-screen/InfoScreen";

const HomeBottomTab = createMaterialBottomTabNavigator<HomeScreensList>();

const HomeScreen: React.FC = () => {
  return (
    <HomeBottomTab.Navigator
      initialRouteName="PersonalFlow"
      barStyle={styles.tabBar}
      shifting={true}
    >
      <HomeBottomTab.Screen
        name="PersonalFlow"
        component={PersonalFlow}
        options={{
          tabBarLabel: "Personal Tasks",
          tabBarIcon: "file-document",
          tabBarColor: "#C9E7F8",
        }}
      />
      <HomeBottomTab.Screen
        name="TeamFlow"
        component={TeamFlow}
        options={{
          tabBarLabel: "Team Tasks",
          tabBarIcon: "contacts",
          tabBarColor: "#9FD5C9",
        }}
      />
      <HomeBottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: "Information",
          tabBarIcon: "image-album",
          tabBarColor: "#F7EAA2",
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
});

export default HomeScreen;
