import React, { useReducer, useState } from "react";
import { Text, StyleSheet } from "react-native";

import { Input, Button } from "react-native-elements";
import DateTimePicker from "./DateTimePicker";

export type SwitchState = {
  startTimeSwitch: boolean;
  startDateSwitch: boolean;
  finishTimeSwitch: boolean;
  finishDateSwitch: boolean;
};

export type SwitchAction = {
  type: "SWITCH_DATE" | "SWITCH_TIME";
  payload: "START" | "FINISH";
};

// Reducer handle the switch button for date and time
const reducer = (state: SwitchState, action: SwitchAction) => {
  switch (action.type) {
    case "SWITCH_DATE":
      if (action.payload === "START") {
        return state.startTimeSwitch
          ? {
              ...state,
              startDateSwitch: false,
              startTimeSwitch: false,
            }
          : { ...state, startDateSwitch: !state.startDateSwitch };
      } else {
        return state.finishTimeSwitch
          ? { ...state, finishDateSwitch: false, finishTimeSwitch: false }
          : { ...state, finishDateSwitch: !state.finishDateSwitch };
      }
    case "SWITCH_TIME":
      if (action.payload === "START") {
        return state.startDateSwitch
          ? { ...state, startTimeSwitch: !state.startTimeSwitch }
          : state;
      } else {
        return state.finishDateSwitch
          ? { ...state, finishTimeSwitch: !state.finishTimeSwitch }
          : state;
      }
    default:
      return state;
  }
};

// AddTaskForm will be used for both Personal and Team
// so addTask must be assigned for suitable action
const AddTaskForm: React.FC = () => {
  // Context for action submit form
  //const { state } = useContext(AuthContext);
  //checkStatus.filter(task => console.log(task))

  // State handle form value
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [finishTime, setFinishTime] = useState("");

  // Reducer for handle switch
  const [switchState, switchDispatch] = useReducer(reducer, {
    startDateSwitch: false,
    startTimeSwitch: false,
    finishDateSwitch: false,
    finishTimeSwitch: false,
  });

  return (
    <>
      <Text style={styles.title}>Add New Tasks</Text>
      <Input
        placeholder="Input Title"
        leftIcon={{ type: "feather", name: "type", color: "white" }}
        style={styles.input}
        label="Task Title *"
        labelStyle={styles.label}
        value={title}
        onChangeText={setTitle}
      />
      <Input
        placeholder="Describe task details (optional)"
        leftIcon={{ type: "feather", name: "info", color: "white" }}
        style={styles.input}
        label="Details"
        labelStyle={styles.label}
        value={details}
        onChangeText={setDetails}
      />
      <DateTimePicker
        name="START"
        value={{
          dateSwitch: switchState.startDateSwitch,
          timeSwitch: switchState.startTimeSwitch,
          date: startDate,
          time: startTime,
        }}
        setValue={{
          switchDispatch,
          setDate: setStartDate,
          setTime: setStartTime,
        }}
      />
      <DateTimePicker
        name="FINISH"
        value={{
          dateSwitch: switchState.finishDateSwitch,
          timeSwitch: switchState.finishTimeSwitch,
          date: finishDate,
          time: finishTime,
        }}
        setValue={{
          switchDispatch,
          setDate: setFinishDate,
          setTime: setFinishTime,
        }}
      />
      <Button
        title="Add Task"
        onPress={() => {
          console.log("Add Task");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
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

export default AddTaskForm;
