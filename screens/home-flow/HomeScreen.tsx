import React from "react";
import { StyleSheet } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import PersonalFlow from "./home-screens/personal-screen/PersonalFlow";
import TeamFlow from "./home-screens/team-screen/TeamFlow";
import InfoScreen from "./home-screens/info-screen/InfoScreen";
import { HomeBottomList } from "../../constants/Constant";

const HomeMaterialBottom = createMaterialBottomTabNavigator<HomeBottomList>();

const HomeScreen: React.FC = () => {
  return (
    <HomeMaterialBottom.Navigator
      initialRouteName="PersonalFlow"
      barStyle={styles.tabBar}
      shifting={true}
    >
      <HomeMaterialBottom.Screen
        name="PersonalFlow"
        component={PersonalFlow}
        options={{
          tabBarLabel: "Personal Tasks",
          tabBarIcon: "file-document",
          tabBarColor: "#C9E7F8",
        }}
      />
      <HomeMaterialBottom.Screen
        name="TeamFlow"
        component={TeamFlow}
        options={{
          tabBarLabel: "Team Tasks",
          tabBarIcon: "contacts",
          tabBarColor: "#9FD5C9",
        }}
      />
      <HomeMaterialBottom.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: "image-album",
          tabBarColor: "#F7EAA2",
        }}
      />
    </HomeMaterialBottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
});

export default HomeScreen;
