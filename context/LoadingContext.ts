import createDataContext from "../utils/CreateDataContext";
import { Dispatch } from "react";

export type LoadingStateType = {
  show: boolean;
};

type LoadingActionType = {
  type: "set_loading";
  payload: boolean;
};

const loadingReducer = (state: LoadingStateType, action: LoadingActionType) => {
  switch (action.type) {
    case "set_loading":
      return {
        show: action.payload,
      };
  }
};

const setLoading = (dispatch: Dispatch<LoadingActionType>) => {
  return (props: boolean) => {
    dispatch({ type: "set_loading", payload: props });
  };
};

export const { Provider, Context } = createDataContext(
  loadingReducer,
  { setLoading },
  { show: false }
);
