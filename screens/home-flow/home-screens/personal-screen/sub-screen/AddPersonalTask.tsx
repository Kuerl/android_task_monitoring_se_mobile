import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AddTaskForm from "../../../../../components/AddTaskForm";

import { PersonalContextType } from "../../../../../context/ContextTypes";
import { Context as PersonalContext } from "../../../../../context/PersonalContext";

const AddPersonalTask: React.FC = () => {
  const { createNewTask }: PersonalContextType = useContext(PersonalContext);

  return (
    <ScrollView style={styles.container}>
      <AddTaskForm formType="CREATE" createNewTask={createNewTask} />
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

export default AddPersonalTask;
