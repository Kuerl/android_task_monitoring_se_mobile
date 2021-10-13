import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";

const PersonalBottomTab = createBottomTabNavigator<PersonalTabList>();

const PersonalFlow: React.FC = () => {
  return (
    <PersonalBottomTab.Navigator
      initialRouteName="PersonalTask"
      screenOptions={{ headerShown: false }}
    >
      <PersonalBottomTab.Screen
        name="PersonalTask"
        component={PersonalTaskScreen}
      />
      <PersonalBottomTab.Screen
        name="AddPersonalTask"
        component={AddPersonalTask}
      />
    </PersonalBottomTab.Navigator>
  );
};

export default PersonalFlow;
