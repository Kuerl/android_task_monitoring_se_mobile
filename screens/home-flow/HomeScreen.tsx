import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawerList } from "./HomeDrawerList";

import PersonalFlow from "./home-screens/personal-screen/PersonalFlow";
import TeamFlow from "./home-screens/team-screen/TeamFlow";
import InfoScreen from "./home-screens/info-screen/InfoScreen";

const HomeDrawer = createDrawerNavigator<HomeDrawerList>();

const HomeScreen: React.FC = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="PersonalFlow"
      screenOptions={{ headerShown: false }}
    >
      <HomeDrawer.Screen
        name="PersonalFlow"
        component={PersonalFlow}
        options={{ title: "Personal Tasks" }}
      />
      <HomeDrawer.Screen
        name="TeamFlow"
        component={TeamFlow}
        options={{ title: "Team Tasks" }}
      />
      <HomeDrawer.Screen
        name="Info"
        component={InfoScreen}
        options={{ title: "Your information" }}
      />
    </HomeDrawer.Navigator>
  );
};

export default HomeScreen;
