import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackList } from "./HomeStackList";

import DecisionScreen from "./home-screens/decision-screen/DecisionScreen";
import PersonalFlow from "./home-screens/personal-screen/PersonalFlow";
import TeamFlow from "./home-screens/team-screen/TeamFlow";
import InfoScreen from "./home-screens/info-screen/InfoScreen";

const HomeStack = createStackNavigator<HomeStackList>();

const HomeScreen: React.FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Decision"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Decision" component={DecisionScreen} />
      <HomeStack.Screen name="PersonalFlow" component={PersonalFlow} />
      <HomeStack.Screen name="TeamFlow" component={TeamFlow} />
      <HomeStack.Screen name="Info" component={InfoScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
