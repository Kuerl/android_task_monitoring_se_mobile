import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPersonalTask: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text>Add Personal Task</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddPersonalTask;
