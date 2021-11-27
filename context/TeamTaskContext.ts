import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

import { TaskType } from "../constants/TaskType";

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
  | { type: "add_err"; payload: { errorMessage: string } }
  | { type: "clear_err" };

// Declare type PROPS for createNewTask function
export type NewTeamTaskType = {
  // username: string;
  pkTeam_Id: string;
  taskData: TaskType;
};

// Declare type PROPS for loadTask function
export type LoadTeamTaskType = {
  // username: string;
  pkTeam_Id: string;
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
          },
        ],
      };
    case "load_task":
      return {
        ...state,
        tasks: action.payload,
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
  return async ({ pkTeam_Id, taskData }: NewTeamTaskType) => {
    try {
      const res = await axios.post("/task/team/" + pkTeam_Id, {
        ...taskData,
        taskType: "Team",
        user: "anhviet",
      });
      if (res.data.effect) {
        dispatch({
          type: "add_task",
          payload: { ...taskData, pkTask_Id: res.data.pkTask_Id },
        });
        RootNavigation.navigate("TeamTask");
      } else {
        dispatch({
          type: "add_err",
          payload: { errorMessage: "Create new team task failed" },
        });
      }
    } catch (err) {
      console.log(err);
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
        };
      });
      dispatch({ type: "load_task", payload: taskData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  teamReducer,
  { createNewTask, loadTask },
  { tasks: [], errorMessage: "" }
);
