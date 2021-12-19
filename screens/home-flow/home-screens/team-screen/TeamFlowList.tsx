import { EventType } from "../../../../components/TaskTimeline";

// This type declares sreens(key) and parameters(value) pass into them
export type TeamTabList = {
  TeamTask: { pkTeam_Id: string };
  AddTeamTask: { pkTeam_Id: string };
  TeamChat: { pkTeam_Id: string };
  TeamInfo: { pkTeam_Id: string };
};

export type TeamStackList = {
  ManageTeam: undefined;
  CreateTeam: undefined;
  TeamBottomTab: { pkTeam_Id: string; teamName: string };
};

export type TeamTaskStackList = {
  ViewTeamTask: { pkTeam_Id: string };
  UpdateTeamTask: { pkTeam_Id: string; taskInfo: EventType };
};
