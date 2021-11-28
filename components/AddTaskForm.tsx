import React, { useReducer, useState, useContext, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import { Input, Button, CheckBox } from "react-native-elements";
import { NewPersonalTaskType } from "../context/PersonalContext";
import DateTimePicker from "./DateTimePicker";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as TeamContext, Member } from "../context/TeamContext";
import { AuthContextType, TeamContextType } from "../context/ContextTypes";
import { NewTeamTaskType } from "../context/TeamTaskContext";

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

type AddTaskFormProps = {
  type: "Personal" | "Team";
  createNewTask:
    | ((props: NewPersonalTaskType) => void)
    | ((props: NewTeamTaskType) => void);
  pkTeam_Id: string;
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
const AddTaskForm: React.FC<AddTaskFormProps> = ({
  type,
  createNewTask,
  pkTeam_Id,
}) => {
  // Context for action submit form
  const { state }: AuthContextType = useContext(AuthContext);
  const teamState: TeamContextType = useContext(TeamContext);

  // Team member for allocation in add task form
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (teamState && type === "Team") {
      setTeamMembers(
        teamState.state.team.filter((team) => team.pkTeam_Id === pkTeam_Id)[0]
          .members
      );
    }
  }, [teamState]);

  // State handle form value
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [finishTime, setFinishTime] = useState("");

  // State to handle user checkbox
  const [user, setUser] = useState("");

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
        placeholder="Describe task content (optional)"
        leftIcon={{ type: "feather", name: "info", color: "white" }}
        style={styles.input}
        label="Content"
        labelStyle={styles.label}
        value={content}
        onChangeText={setContent}
      />
      {type === "Team" ? (
        <View style={styles.allocationContainer}>
          <Text style={styles.allocationLabel}>Allocated To:</Text>
          {teamMembers.map((member) => {
            return (
              <CheckBox
                key={member.user.username}
                title={member.user.username}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={member.user.username === user}
                onPress={() => setUser(member.user.username)}
              />
            );
          })}
        </View>
      ) : null}
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
        onPress={() =>
          createNewTask({
            username: state.username,
            pkTeam_Id: pkTeam_Id,
            taskData: {
              title,
              content,
              start: startDate + " " + startTime,
              due: finishDate + " " + finishTime,
              user: user,
            },
          })
        }
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
  allocationContainer: {
    top: -5,
    marginBottom: 10,
  },
  allocationLabel: {
    color: "white",
    fontSize: 20,
    paddingLeft: 15,
  },
});

export default AddTaskForm;
