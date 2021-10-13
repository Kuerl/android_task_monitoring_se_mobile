import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackList } from "./HomeStackList";

import DecisionScreen from "./home-screens/decision-screen/DecisionScreen";
import PersonalScreen from "./home-screens/personal-screen/PersonalScreen";
import TeamScreen from "./home-screens/team-screen/TeamScreen";
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
      <HomeStack.Screen name="Personal" component={PersonalScreen} />
      <HomeStack.Screen name="Team" component={TeamScreen} />
      <HomeStack.Screen name="Info" component={InfoScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
