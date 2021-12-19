import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import AddTaskForm from "../../../../../components/AddTaskForm";
import { PersonalContextType } from "../../../../../context/ContextTypes";
import { Context as PersonalContext } from "../../../../../context/PersonalContext";
import { StackScreenProps } from "@react-navigation/stack";
import { PersonalTaskStackList } from "../PersonalTabList";

type PersonalTaskProps = StackScreenProps<
  PersonalTaskStackList,
  "UpdatePersonalTask"
>;

const UpdatePersonalTask: React.FC<PersonalTaskProps> = ({ route }) => {
  const { state, updateTask }: PersonalContextType =
    useContext(PersonalContext);
  return (
    <ScrollView style={styles.container}>
      <AddTaskForm
        formType="UPDATE"
        update={{
          updateExistingTask: updateTask,
          taskInfo: state.tasks.find(
            (task) => task.pkTask_Id == route.params.pkTask_Id
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

export default UpdatePersonalTask;
