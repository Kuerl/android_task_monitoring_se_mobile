import React, { useReducer, useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";

import { Input, Button, CheckBox, Overlay } from "react-native-elements";
import {
  NewPersonalTaskType,
  UpdatePersonalTask,
} from "../context/PersonalContext";
import DateTimePicker from "./DateTimePicker";
import { TriangleColorPicker } from "react-native-color-picker";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as TeamContext, Member } from "../context/TeamContext";
import { AuthContextType, TeamContextType } from "../context/ContextTypes";
import {
  NewTeamTaskType,
  UpdateTeamTaskType,
} from "../context/TeamTaskContext";
import { TaskType } from "../constants/TaskType";

export type SwitchState = {
  startTimeSwitch: boolean;
  startDateSwitch: boolean;
  finishTimeSwitch: boolean;
  finishDateSwitch: boolean;
};

export type SwitchAction = {
  type: "SWITCH_DATE" | "SWITCH_TIME" | "RESET";
  payload?: "START" | "FINISH";
};

type AddTaskFormProps = {
  formType: "CREATE" | "UPDATE";
  createNewTask?:
    | ((props: NewPersonalTaskType) => void)
    | ((props: NewTeamTaskType) => void);
  update?: {
    updateExistingTask:
      | ((props: UpdatePersonalTask) => void)
      | ((props: UpdateTeamTaskType) => void);
    taskInfo?: TaskType;
  };
  pkTeam_Id?: string; // Provide this props in team task (REQUIRED)
};

// Reducer handle the switch button for date and time
const reducer = (state: SwitchState, action: SwitchAction) => {
  switch (action.type) {
    case "SWITCH_DATE":
      if (action.payload === "START") {
        return state.startTimeSwitch
          ? {
              startDateSwitch: false,
              startTimeSwitch: false,
              finishTimeSwitch: false,
              finishDateSwitch: false,
            }
          : { ...state, startDateSwitch: !state.startDateSwitch };
      } else {
        return state.finishTimeSwitch || !state.startTimeSwitch
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
    case "RESET":
      return {
        startTimeSwitch: false,
        startDateSwitch: false,
        finishTimeSwitch: false,
        finishDateSwitch: false,
      };
    default:
      return state;
  }
};

// AddTaskForm will be used for both Personal and Team
// so addTask must be assigned for suitable action
const AddTaskForm: React.FC<AddTaskFormProps> = ({
  formType,
  createNewTask,
  update,
  pkTeam_Id,
}) => {
  // Context for action submit form
  const { state }: AuthContextType = useContext(AuthContext);
  const teamState: TeamContextType = useContext(TeamContext);

  // Team member for allocation in add task form
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  // State to handle overlay
  const [visible, setVisible] = useState(false);

  // State handle form value
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#add8e6");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [finishTime, setFinishTime] = useState("");

  // State to handle user checkbox
  const [user, setUser] = useState("");

  const [pkTask_Id, setPkTask_Id] = useState(0);
  const [done, setDone] = useState(false);

  // Reducer for handle switch
  const [switchState, switchDispatch] = useReducer(reducer, {
    startDateSwitch: false,
    startTimeSwitch: false,
    finishDateSwitch: false,
    finishTimeSwitch: false,
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (teamState && pkTeam_Id) {
      setTeamMembers(
        teamState.state.team.filter((team) => team.pkTeam_Id === pkTeam_Id)[0]
          .members
      );
    }
  }, [teamState]);

  useEffect(() => {
    if (update && update.taskInfo) {
      setPkTask_Id(update.taskInfo.pkTask_Id);
      setTitle(update.taskInfo.title);
      setContent(update.taskInfo.content);
      setStartTime(update.taskInfo.start.slice(11, 16));
      setStartDate(update.taskInfo.start.slice(0, 10));
      setFinishTime(update.taskInfo.due.slice(11, 16));
      setFinishDate(update.taskInfo.due.slice(0, 10));
      setDone(update.taskInfo.done);
      setColor(update.taskInfo.color);
      if (update.taskInfo.user) setUser(update.taskInfo.user.username);

      switchDispatch({ type: "SWITCH_DATE", payload: "START" });
      switchDispatch({ type: "SWITCH_TIME", payload: "START" });

      switchDispatch({ type: "SWITCH_DATE", payload: "FINISH" });
      switchDispatch({ type: "SWITCH_TIME", payload: "FINISH" });
    }
  }, []);

  return (
    <>
      <Text style={styles.title}>
        {formType == "CREATE" ? "Add New Tasks" : "Update Task"}
      </Text>
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
      <View style={styles.colorContainer}>
        <Text style={styles.txt}>Task Color:</Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: color }]}
          onPress={toggleOverlay}
        />
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay}
        >
          <TriangleColorPicker
            onColorSelected={(color) => {
              Alert.alert("Your task color is selected", "", [
                { text: "Ok", onPress: toggleOverlay },
              ]);
              setColor(color);
            }}
            defaultColor={color}
            oldColor={color}
            style={{ flex: 1 }}
          />
        </Overlay>
      </View>
      {update ? (
        <View style={styles.colorContainer}>
          <Text style={styles.txt}>Status: </Text>
          {Platform.OS == "ios" ? (
            <PickerIOS
              selectedValue={done ? 1 : 0}
              itemStyle={{ height: 60, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setDone(!!itemValue)}
            >
              <Picker.Item label="In Progress" color="red" value={0} />
              <Picker.Item label="Done" color="green" value={1} />
            </PickerIOS>
          ) : (
            <Picker
              selectedValue={done ? 1 : 0}
              style={{ height: 35, width: 170, color: "white" }}
              onValueChange={(itemValue, itemIndex) => setDone(!!itemValue)}
            >
              <Picker.Item
                label="In Progress"
                style={styles.labelStatus}
                color="red"
                value={0}
              />
              <Picker.Item
                label="Done"
                color="green"
                style={styles.labelStatus}
                value={1}
              />
            </Picker>
          )}
        </View>
      ) : null}
      {pkTeam_Id ? (
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
        type={createNewTask ? "CREATE" : "UPDATE"}
        value={{
          dateSwitch: switchState.startDateSwitch,
          timeSwitch: switchState.startTimeSwitch,
          date: startDate,
          time: startTime,
          startDate,
          startTime,
        }}
        setValue={{
          switchDispatch,
          setDate: setStartDate,
          setTime: setStartTime,
        }}
      />
      <DateTimePicker
        name="FINISH"
        type={createNewTask ? "CREATE" : "UPDATE"}
        value={{
          dateSwitch: switchState.finishDateSwitch,
          timeSwitch: switchState.finishTimeSwitch,
          date: finishDate,
          time: finishTime,
          startDate,
          startTime,
        }}
        setValue={{
          switchDispatch,
          setDate: setFinishDate,
          setTime: setFinishTime,
        }}
      />
      <Button
        title={createNewTask ? "Add Task" : "Update Task"}
        onPress={() => {
          if (!title.replace(/\s/g, "").length) {
            Alert.alert("You must input your task title!");
          } else if (Object.values(switchState).includes(false)) {
            Alert.alert("You must input your task's date and time!");
          } else if (pkTeam_Id && !user.length) {
            Alert.alert("You must allocate this task to a team's member!");
          } else {
            if (createNewTask) {
              createNewTask({
                username: state.username,
                pkTeam_Id: pkTeam_Id || "",
                taskData: {
                  pkTask_Id: 0, // not have yet
                  title,
                  content,
                  start: startDate + " " + startTime,
                  due: finishDate + " " + finishTime,
                  user: { username: user },
                  done: false,
                  color,
                },
              });
            } else if (update) {
              update.updateExistingTask({
                username: state.username,
                pkTeam_Id: pkTeam_Id || "",
                taskData: {
                  pkTask_Id,
                  title,
                  content,
                  start: startDate + " " + startTime,
                  due: finishDate + " " + finishTime,
                  user: { username: user },
                  done,
                  color,
                },
              });
            }
          }
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
  allocationContainer: {
    top: -5,
    marginBottom: 10,
  },
  allocationLabel: {
    color: "white",
    fontSize: 20,
    paddingLeft: 15,
  },
  colorContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  txt: {
    fontSize: 20,
    marginRight: 15,
    color: "white",
  },
  btn: {
    width: 50,
    height: 30,
    borderRadius: 10,
  },
  overlay: {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  },
  labelStatus: {
    fontSize: 20,
    color: "black",
  },
});

export default AddTaskForm;
