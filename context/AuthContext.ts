import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";

export type AuthStateType = {
  authentication: boolean;
  errorMessage: { effect: boolean; status: string };
  pkAccount_Id: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  active: boolean;
};

type AuthActionType =
  | { type: "sign_in" }
  | {
      type: "get_infor";
      payload: {
        pkAccount_Id: string;
        username: string;
        firstName: string;
        lastName: string;
        description: string;
        active: boolean;
      };
    }
  | { type: "sign_out" }
  | { type: "add_err"; payload: { status: string } }
  | { type: "clear_err_msg" };

export type SignInProps = {
  username: string;
  password: string;
};

const authReducer = (state: AuthStateType, action: AuthActionType) => {
  switch (action.type) {
    case "sign_in":
      return {
        ...state,
        authentication: true,
        errorMessage: { effect: false, status: "" },
      };
    case "get_infor":
      return {
        ...state,
        pkAccount_Id: action.payload.pkAccount_Id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        description: action.payload.description,
        active: action.payload.active,
      };
    case "sign_out":
      return {
        authentication: false,
        errorMessage: { effect: false, status: "" },
        pkAccount_Id: "",
        username: "",
        firstName: "",
        lastName: "",
        description: "",
        active: false,
      };
    case "add_err":
      return {
        ...state,
        errorMessage: { effect: true, status: action.payload.status },
      };
    case "clear_err_msg":
      return { ...state, errorMessage: { effect: false, status: "" } };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch: Dispatch<AuthActionType>) => () => {
  dispatch({ type: "clear_err_msg" });
};

// if valid: sign in, then get all user information - else: err msg
const signIn = (dispatch: Dispatch<AuthActionType>) => {
  return async ({ username, password }: SignInProps) => {
    try {
      const res = await axios.post("/login", { username, password });
      if (res.data.effect) {
        dispatch({ type: "sign_in" });
        const userInfo = await axios.get("/user/" + username);
        dispatch({ type: "get_infor", payload: userInfo.data });
      } else {
        dispatch({ type: "add_err", payload: { status: res.data.status } });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const signOut = (dispatch: Dispatch<AuthActionType>) => () => {
  dispatch({ type: "sign_out" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    clearErrorMessage,
    signOut,
  },
  {
    authentication: false,
    pkAccount_Id: "",
    username: "",
    firstName: "",
    lastName: "",
    description: "",
    active: false,
    errorMessage: { effect: false, status: "" },
  }
);
