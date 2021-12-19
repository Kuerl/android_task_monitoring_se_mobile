import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PersonalTabList, PersonalTaskStackList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";
import UpdatePersonalTask from "./sub-screen/UpdatePersonalTask";
import DrawerContent from "../../../../components/DrawerContent";

import { Provider as PersonalProvider } from "../../../../context/PersonalContext";

const PersonalDrawer = createDrawerNavigator<PersonalTabList>();
const PersonalTaskStack = createStackNavigator<PersonalTaskStackList>();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContent>
      <DrawerItemList {...props} />
    </DrawerContent>
  );
}

const PersonalTaskComponent: React.FC = () => {
  return (
    <PersonalTaskStack.Navigator initialRouteName="ViewPersonalTask">
      <PersonalTaskStack.Screen
        name="ViewPersonalTask"
        component={PersonalTaskScreen}
        options={{ title: "View Personal Tasks" }}
      />
      <PersonalTaskStack.Screen
        name="UpdatePersonalTask"
        component={UpdatePersonalTask}
        options={{ title: "Update Personal Tasks" }}
      />
    </PersonalTaskStack.Navigator>
  );
};

const PersonalFlow: React.FC = () => {
  return (
    <PersonalProvider>
      <PersonalDrawer.Navigator
        initialRouteName="PersonalTask"
        // screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <PersonalDrawer.Screen
          name="PersonalTask"
          component={PersonalTaskComponent}
          options={{ headerShown: false, title: "View Personal Tasks" }}
        />
        <PersonalDrawer.Screen
          name="AddPersonalTask"
          component={AddPersonalTask}
          options={{ title: "Create Personal Tasks" }}
        />
      </PersonalDrawer.Navigator>
    </PersonalProvider>
  );
};

export default PersonalFlow;
