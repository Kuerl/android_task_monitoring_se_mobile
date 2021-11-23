import {AuthStateType, SignInProps} from "./AuthContext";
import {CreateTeamProps, LoadTeamProps, TeamStateType} from "./TeamContext";

export type AuthContextType = {
  state: AuthStateType;
  signIn: ({ username, password }: SignInProps) => void;
  clearErrorMessage: () => void;
  signOut: () => void;
}

export type TeamContextType = {
  state: TeamStateType;
  createNewTeam: (props: CreateTeamProps) => void;
  loadAllTeam: (props: LoadTeamProps) => void
}
