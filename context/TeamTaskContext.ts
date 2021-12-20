import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

import { TaskType } from "../constants/TaskType";
import { Alert } from "react-native";
import { wait } from "../utils/Wait";

// Declare State and Action type
export type TeamTaskStateType = {
  tasks: TaskType[];
  errorMessage: string;
};

export type TeamTaskActionType =
  | { type: "clear_task" }
  | {
      type: "add_task";
      payload: TaskType;
    }
  | { type: "load_task"; payload: TaskType[] }
  | { type: "update_task"; payload: TaskType }
  | { type: "add_err"; payload: { errorMessage: string } }
  | { type: "clear_err" };

// Declare type PROPS for createNewTask function
export type NewTeamTaskType = {
  // username: string;
  pkTeam_Id: string;
  taskData: TaskType;
  setLoading: (props: boolean) => void;
};

// Declare type PROPS for loadTask function
export type LoadTeamTaskType = {
  // username: string;
  pkTeam_Id: string;
};

export type UpdateTeamTaskType = {
  username: string;
  pkTeam_Id: string;
  taskData: TaskType;
  setLoading: (props: boolean) => void;
};

const teamReducer = (state: TeamTaskStateType, action: TeamTaskActionType) => {
  switch (action.type) {
    case "clear_task":
      return {
        ...state,
        tasks: [],
      };
    case "add_task":
      return {
        tasks: [
          ...state.tasks,
          {
            pkTask_Id: action.payload.pkTask_Id,
            title: action.payload.title,
            content: action.payload.content,
            start: action.payload.start,
            due: action.payload.due,
            user: action.payload.user,
            done: action.payload.done,
            color: action.payload.color,
          },
        ],
      };
    case "load_task":
      return {
        ...state,
        tasks: action.payload,
      };
    case "update_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.pkTask_Id === action.payload.pkTask_Id ? action.payload : task
        ),
      };
    case "add_err":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case "clear_err":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

const createNewTask = (dispatch: Dispatch<TeamTaskActionType>) => {
  return async ({ pkTeam_Id, taskData, setLoading }: NewTeamTaskType) => {
    if (taskData.user) {
      try {
        const res = await axios.post("/task/team/" + pkTeam_Id, {
          ...taskData,
          taskType: "Team",
          user: taskData.user.username,
        });
        wait(1500).then(() => {
          setLoading(false);
          if (res.data.effect) {
            dispatch({
              type: "add_task",
              payload: { ...taskData, pkTask_Id: res.data.pkTask_Id },
            });
            Alert.alert("Your team task has been created successfully!", "", [
              {
                text: "Ok",
                onPress: () => RootNavigation.dispatch("TeamTask"),
              },
            ]);
          } else {
            Alert.alert("Something went wrong!");
            dispatch({
              type: "add_err",
              payload: { errorMessage: "Create new team task failed" },
            });
          }
        });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
};

const loadTask = (dispatch: Dispatch<TeamTaskActionType>) => {
  return async ({ pkTeam_Id }: LoadTeamTaskType) => {
    try {
      const res = await axios.get("/task/team/" + pkTeam_Id);
      // Format the response data to local state
      const taskData: TaskType[] = res.data.map((task: any) => {
        return {
          pkTask_Id: task.pkTask_Id,
          title: task.title,
          content: task.content,
          start: task.start.slice(0, 19).replace("T", " "),
          due: task.due.slice(0, 19).replace("T", " "),
          user: task.user,
          done: task.done,
          color: task.color,
        };
      });
      dispatch({ type: "load_task", payload: taskData });
    } catch (err) {
      console.log(err);
    }
  };
};

const updateTask = (dispatch: Dispatch<TeamTaskActionType>) => {
  return async ({
    pkTeam_Id,
    username,
    taskData,
    setLoading,
  }: UpdateTeamTaskType) => {
    if (taskData.user) {
      try {
        const res = await axios.put(
          `/task/team/${pkTeam_Id}/${taskData.pkTask_Id}/${username}`,
          {
            ...taskData,
            taskType: "Team",
            user: taskData.user.username,
          }
        );
        wait(1500).then(() => {
          setLoading(false);
          if (res.data.effect) {
            dispatch({
              type: "update_task",
              payload: taskData,
            });
            Alert.alert("Your team task has been updated successfully!", "", [
              {
                text: "Ok",
                onPress: () => RootNavigation.dispatch("TeamTask"),
              },
            ]);
          } else {
            Alert.alert("Something went wrong!");
            dispatch({
              type: "add_err",
              payload: { errorMessage: "Update team task failed" },
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const { Provider, Context } = createDataContext(
  teamReducer,
  { createNewTask, loadTask, updateTask },
  { tasks: [], errorMessage: "" }
);
