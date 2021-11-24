import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

type PersonalTaskType = {
  title: string;
  content: string;
  taskType: "Personal";
  start: string;
  due: string;
};

// Declare State and Action type
export type PersonalStateType = {
  tasks: PersonalTaskType[];
  errorMessage: string;
};

export type PersonalActionType =
  | {
      type: "add_task";
      payload: PersonalTaskType;
    }
  | { type: "add_err"; payload: { errorMessage: string } };

// Declare type for createNewTask function
export type NewPersonalTaskType = {
  username: string;
  taskData: PersonalTaskType;
};


const personalReducer = (
  state: PersonalStateType,
  action: PersonalActionType
) => {
  switch (action.type) {
    case "add_task":
      return {
        tasks: [
          ...state.tasks,
          {
            title: action.payload.title,
            content: action.payload.content,
            start: action.payload.start,
            due: action.payload.due,
          },
        ],
      };
    case "add_err":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

const createNewTask = (dispatch: Dispatch<PersonalActionType>) => {
  return async ({ username, taskData }: NewPersonalTaskType) => {
    try {
      const res = await axios.post("/task/personal/" + username, taskData);
      console.log(res.data);
      if (res.data.effect) {
        dispatch({
          type: "add_task",
          payload: taskData,
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

export const { Provider, Context } = createDataContext(
  personalReducer,
  { createNewTask },
  { tasks: [], errorMessage: "" }
);
