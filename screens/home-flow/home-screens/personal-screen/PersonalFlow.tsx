import React from "react";

import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";
import DrawerContent from "../../../../components/DrawerContent";

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
  );
};

export default PersonalFlow;
