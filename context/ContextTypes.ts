import { AuthStateType, SignInProps } from "./AuthContext";
import {
  LoadPersonalTaskType,
  NewPersonalTaskType,
  PersonalStateType,
  UpdatePersonalTask,
} from "./PersonalContext";
import {
  CreateTeamProps,
  LoadTeamMemberProps,
  LoadTeamProps,
  TeamStateType,
} from "./TeamContext";
import {
  LoadTeamTaskType,
  NewTeamTaskType,
  TeamTaskStateType,
} from "./TeamTaskContext";

export type AuthContextType = {
  state: AuthStateType;
  signIn: ({ username, password }: SignInProps) => void;
  clearErrorMessage: () => void;
  signOut: () => void;
};

export type TeamContextType = {
  state: TeamStateType;
  createNewTeam: (props: CreateTeamProps) => void;
  loadAllTeam: (props: LoadTeamProps) => void;
  loadTeamMembers: (props: LoadTeamMemberProps) => void;
};

export type PersonalContextType = {
  state: PersonalStateType;
  createNewTask: (props: NewPersonalTaskType) => void;
  loadTask: (props: LoadPersonalTaskType) => void;
  updateTask: (props: UpdatePersonalTask) => void;
};

export type TeamTaskContextType = {
  state: TeamTaskStateType;
  createNewTask: (props: NewTeamTaskType) => void;
  loadTask: (props: LoadTeamTaskType) => void;
};
