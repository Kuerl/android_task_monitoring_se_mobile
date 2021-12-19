import { Dimensions } from "react-native";

export const svurl: string = "http://128.199.66.87:3000/";

export const signform = {
  none: -1,
  in: 0,
  up: 1,
  ins: 999,
};

export type RootParamsList = {
  PersonalTask: undefined;
  AddPersonalTask: undefined;
  ManageTeam: undefined;
  TeamTask: undefined;
  AddTeamTask: undefined;
  TeamChat: undefined;
  TeamInfo: undefined;
  Info: undefined;
};

export type RootScreensList =
  | "PersonalTask"
  | "AddPersonalTask"
  | "UpdatePersonalTask"
  | "ManageTeam"
  | "TeamTask"
  | "UpdateTeamTask"
  | "AddTeamTask"
  | "TeamChat"
  | "TeamInfo"
  | "Info";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
