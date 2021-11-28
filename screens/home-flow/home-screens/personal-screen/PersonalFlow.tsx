import React from "react";

import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";
import DrawerContent from "../../../../components/DrawerContent";

import { Provider as PersonalProvider } from "../../../../context/PersonalContext";

const PersonalDrawer = createDrawerNavigator<PersonalTabList>();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContent>
      <DrawerItemList {...props} />
    </DrawerContent>
  );
}

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
          component={PersonalTaskScreen}
          options={{ title: "View Personal Tasks" }}
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
