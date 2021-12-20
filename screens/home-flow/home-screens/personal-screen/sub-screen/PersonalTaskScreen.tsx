import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-elements";

import TaskTimeline from "../../../../../components/TaskTimeline";
import { PersonalTabList } from "../PersonalTabList";
import { DrawerScreenProps } from "@react-navigation/drawer";

import { Context as AuthContext } from "../../../../../context/AuthContext";
import { AuthContextType } from "../../../../../context/ContextTypes";

import { Context as PersonalContext } from "../../../../../context/PersonalContext";
import { PersonalContextType } from "../../../../../context/ContextTypes";

import { splitTask } from "../../../../../utils/SplitTask";

type PersonalDrawerProps = DrawerScreenProps<PersonalTabList, "PersonalTask">;

const PersonalTaskScreen: React.FC<PersonalDrawerProps> = ({ navigation }) => {
  const { state, loadTask }: PersonalContextType = useContext(PersonalContext);
  const authContext: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    loadTask({ username: authContext.state.username });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <TaskTimeline
        events={splitTask(state.tasks)}
        refresh={() => loadTask({ username: authContext.state.username })}
      />
      <FAB
        // title="Create Team"
        color="#439DE4"
        icon={{ type: "feather", name: "plus", color: "white" }}
        placement="right"
        onPress={() => navigation.navigate("AddPersonalTask")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  header: {
    // paddingTop: 30,
    backgroundColor: "white",
  },
  emptyItemText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default PersonalTaskScreen;
