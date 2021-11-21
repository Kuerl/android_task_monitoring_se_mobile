import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Team Form</Text>
      <Input
        label="Team Name *"
        labelStyle={styles.label}
        leftIcon={{ type: "ionicons", name: "people", color: "white" }}
        placeholder="Input Team Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Team Details"
        labelStyle={styles.label}
        leftIcon={{ type: "feather", name: "info", color: "white" }}
        placeholder="Describe More Details (optional)"
        style={styles.input}
        value={details}
        onChangeText={setDetails}
      />
      <Button title="Create" onPress={() => console.log("CREATED TEAM")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  title: {
    paddingVertical: 20,
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  label: {
    color: "white",
  },
  input: {
    color: "white",
    paddingLeft: 8,
  },
});

export default CreateTeam;
