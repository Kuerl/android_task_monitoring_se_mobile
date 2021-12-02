import { TeamType } from "../context/TeamContext";

export const getTeamInfo = (pkTeam_Id: string, teamList: TeamType[]) =>
  teamList.filter((team) => team.pkTeam_Id === pkTeam_Id)[0];
