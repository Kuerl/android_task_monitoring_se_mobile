import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

type TeamType = {
  pkTeam_Id: string;
  teamName: string;
};

export type TeamStateType = {
  team: TeamType[];
  errorMessage: string;
};

type TeamActionType =
  | { type: "add_team"; payload: TeamType }
  | { type: "clear_team" }
  | { type: "add_err"; payload: { errorMessage: string } };

export type CreateTeamProps = {
  teamName: string;
  username: string;
};

export type LoadTeamProps = {
  username: string;
};

const teamReducer = (state: TeamStateType, action: TeamActionType) => {
  switch (action.type) {
    case "add_team":
      return {
        team: [
          ...state.team,
          {
            pkTeam_Id: action.payload.pkTeam_Id,
            teamName: action.payload.teamName,
          },
        ],
        errorMessage: "",
      };
    case "clear_team":
      return {
        ...state,
        team: [],
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

const createNewTeam = (dispatch: Dispatch<TeamActionType>) => {
  return async ({ teamName, username }: CreateTeamProps) => {
    try {
      const res = await axios.post("/team", { teamName, username });
      if (res.data.pkTeam_Id) {
        dispatch({
          type: "add_team",
          payload: {
            teamName: res.data.teamName,
            pkTeam_Id: res.data.pkTeam_Id,
          },
        });
        RootNavigation.navigate("ManageTeam");
      } else {
        dispatch({
          type: "add_err",
          payload: { errorMessage: "Create team failed" },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const loadAllTeam = (dispatch: Dispatch<TeamActionType>) => {
  type ResponseType = {
    teamUserId: number;
    memberRole: string;
    team: {
      pkTeam_Id: string;
      teamName: string;
    };
  };

  return async ({ username }: LoadTeamProps) => {
    try {
      dispatch({ type: "clear_team" });
      const res = await axios.get("/team/user/" + username);
      res.data.effect !== false
        ? res.data.map((resData: ResponseType) =>
            dispatch({
              type: "add_team",
              payload: {
                pkTeam_Id: resData.team.pkTeam_Id,
                teamName: resData.team.teamName,
              },
            })
          )
        : console.log("Load error");
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  teamReducer,
  { createNewTeam, loadAllTeam },
  { team: [], errorMessage: "" }
);
