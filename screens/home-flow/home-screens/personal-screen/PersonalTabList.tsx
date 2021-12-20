import { EventType } from "../../../../components/TaskTimeline";

// This type declares sreens(key) and parameters(value) pass into them
export type PersonalTabList = {
  PersonalTask: undefined;
  AddPersonalTask: undefined;
};

export type PersonalTaskStackList = {
  ViewPersonalTask: undefined;
  UpdatePersonalTask: EventType;
};
