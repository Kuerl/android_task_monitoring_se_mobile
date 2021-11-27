import React, { useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AddTaskForm from "../../../../../components/AddTaskForm";
import {
  TeamContextType,
  TeamTaskContextType,
} from "../../../../../context/ContextTypes";

import { Context as TeamContext } from "../../../../../context/TeamContext";
import { Context as TeamTaskContext } from "../../../../../context/TeamTaskContext";
import { TeamTabList } from "../TeamFlowList";
import { DrawerScreenProps } from "@react-navigation/drawer";

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "AddTeamTask">;

const AddTeamTask: React.FC<TeamDrawerProps> = ({ route }) => {
  const { createNewTask }: TeamTaskContextType = useContext(TeamTaskContext);
  const { loadTeamMembers }: TeamContextType = useContext(TeamContext);
  
  useEffect(() => {
    loadTeamMembers(route.params);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <AddTaskForm
        type="Team"
        createNewTask={createNewTask}
        pkTeam_Id={route.params.pkTeam_Id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
});

export default AddTeamTask;
