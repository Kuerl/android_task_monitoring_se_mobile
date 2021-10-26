import React from "react";
import { Text, StyleSheet } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PersonalTabList } from "./PersonalTabList";
import PersonalTaskScreen from "./sub-screen/PersonalTaskScreen";
import AddPersonalTask from "./sub-screen/AddPersonalTask";

const PersonalDrawer = createDrawerNavigator<PersonalTabList>();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.drawerTxt}>Hello, Anh Viet</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const PersonalFlow: React.FC = () => {
  return (
    <PersonalDrawer.Navigator
      initialRouteName="PersonalTask"
      screenOptions={{ headerShown: false }}
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

const styles = StyleSheet.create({
  drawerTxt: {
    paddingLeft: 10,
    paddingBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PersonalFlow;
