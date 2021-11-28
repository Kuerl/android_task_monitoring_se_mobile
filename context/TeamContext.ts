import createDataContext from "../utils/CreateDataContext";
import axios from "../utils/AxiosBase";
import { Dispatch } from "react";
import * as RootNavigation from "../utils/NavigationRef";

export type Member = {
  memberRole: "Admin" | "Member";
  user: {
    username: string;
    firstName: string;
    lastName: string;
    description: string;
    active: boolean;
  };
};

export type TeamType = {
  pkTeam_Id: string;
  teamName: string;
  members: Member[];
};

export type TeamStateType = {
  team: TeamType[];
  errorMessage: string;
};

type TeamActionType =
  | { type: "add_team"; payload: TeamType }
  | { type: "clear_team" }
  | { type: "get_members"; payload: { pkTeam_Id: string; members: Member[] } }
  | { type: "add_err"; payload: { errorMessage: string } };

export type CreateTeamProps = {
  teamName: string;
  username: string;
};

export type LoadTeamProps = {
  username: string;
};

export type LoadTeamMemberProps = {
  pkTeam_Id: string;
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
            members: action.payload.members,
          },
        ],
        errorMessage: "",
      };
    case "clear_team":
      return {
        ...state,
        team: [],
      };
    case "get_members":
      return {
        ...state,
        team: state.team.map((teamValue) => {
          if (teamValue.pkTeam_Id == action.payload.pkTeam_Id) {
            teamValue.members = action.payload.members;
          }
          return teamValue;
        }),
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
            members: [],
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
                members: [],
              },
            })
          )
        : console.log("Load error");
    } catch (err) {
      console.log(err);
    }
  };
};

const loadTeamMembers = (dispatch: Dispatch<TeamActionType>) => {
  return async ({ pkTeam_Id }: LoadTeamMemberProps) => {
    try {
      const res = await axios.get("/team/" + pkTeam_Id);
      dispatch({
        type: "get_members",
        payload: { pkTeam_Id: pkTeam_Id, members: res.data.members },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  teamReducer,
  { createNewTeam, loadAllTeam, loadTeamMembers },
  { team: [], errorMessage: "" }
);
