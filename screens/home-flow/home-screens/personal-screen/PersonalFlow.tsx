import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";

const PersonalDrawer = createDrawerNavigator<PersonalTabList>();

const PersonalFlow: React.FC = () => {
  return (
    <PersonalDrawer.Navigator
      initialRouteName="PersonalTask"
      screenOptions={{ headerShown: false }}
    >
      <PersonalDrawer.Screen
        name="PersonalTask"
        component={PersonalTaskScreen}
        options={{ title: "View Personal Tasks" }}
      />
      <PersonalDrawer.Screen
        name="AddPersonalTask"
        component={AddPersonalTask}
        options={{ title: "Create Personal Tasks" }}
      />
    </PersonalDrawer.Navigator>
  );
};

export default PersonalFlow;
