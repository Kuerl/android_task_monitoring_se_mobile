import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import AddTaskForm from "../../../../../components/AddTaskForm";

const AddPersonalTask: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <AddTaskForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
});

export default AddPersonalTask;
