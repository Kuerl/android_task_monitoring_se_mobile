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
