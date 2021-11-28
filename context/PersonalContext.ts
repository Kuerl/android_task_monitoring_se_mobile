import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

import { TaskType } from "../constants/TaskType";

// type PersonalTaskType = {
//   pkTask_Id: number;
//   title: string;
//   content: string;
//   start: string;
//   due: string;
// };

// Declare State and Action type
export type PersonalStateType = {
  tasks: TaskType[];
  errorMessage: string;
};

export type PersonalActionType =
  | { type: "clear_task" }
  | {
      type: "add_task";
      payload: TaskType;
    }
  | { type: "load_task"; payload: TaskType[] }
  | { type: "add_err"; payload: { errorMessage: string } }
  | { type: "clear_err" };

// Declare type PROPS for createNewTask function
export type NewPersonalTaskType = {
  username: string;
  taskData: TaskType;
};

// Declare type PROPS for loadTask function
export type LoadPersonalTaskType = {
  username: string;
};

const personalReducer = (
  state: PersonalStateType,
  action: PersonalActionType
) => {
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

const createNewTask = (dispatch: Dispatch<PersonalActionType>) => {
  return async ({ username, taskData }: NewPersonalTaskType) => {
    try {
      const res = await axios.post("/task/personal/" + username, {
        ...taskData,
        taskType: "Personal",
      });
      if (res.data.effect) {
        dispatch({
          type: "add_task",
          payload: { ...taskData, pkTask_Id: res.data.pkTask_Id },
        });
        RootNavigation.navigate("PersonalTask");
      } else {
        dispatch({
          type: "add_err",
          payload: { errorMessage: "Create new personal task failed" },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const loadTask = (dispatch: Dispatch<PersonalActionType>) => {
  return async ({ username }: LoadPersonalTaskType) => {
    try {
      const res = await axios.get("/task/personal/" + username);
      // Format the response data to local state
      const taskData: TaskType[] = res.data.map((task: any) => {
        return {
          pkTask_Id: task.pkTask_Id,
          title: task.title,
          content: task.content,
          start: task.start.slice(0, 19).replace("T", " "),
          due: task.due.slice(0, 19).replace("T", " "),
        };
      });
      dispatch({ type: "load_task", payload: taskData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  personalReducer,
  { createNewTask, loadTask },
  { tasks: [], errorMessage: "" }
);
