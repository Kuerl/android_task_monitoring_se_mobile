import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

import AddTaskForm from "../../../../../components/AddTaskForm";
import {
  TeamContextType,
  TeamTaskContextType,
} from "../../../../../context/ContextTypes";
import { Context as TeamTaskContext } from "../../../../../context/TeamTaskContext";
import { Context as TeamContext } from "../../../../../context/TeamContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamTaskStackList } from "../TeamFlowList";

type TeamTaskProps = StackScreenProps<TeamTaskStackList, "UpdateTeamTask">;

const UpdateTeamTask: React.FC<TeamTaskProps> = ({ route }) => {
  const { state, updateTask }: TeamTaskContextType =
    useContext(TeamTaskContext);
  const { loadTeamMembers }: TeamContextType = useContext(TeamContext);

  useEffect(() => {
    loadTeamMembers(route.params);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <AddTaskForm
        formType="UPDATE"
        pkTeam_Id={route.params.pkTeam_Id}
        update={{
          updateExistingTask: updateTask,
          taskInfo: state.tasks.find(
            (task) => task.pkTask_Id == route.params.taskInfo.pkTask_Id
          ),
        }}
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

export default UpdateTeamTask;
