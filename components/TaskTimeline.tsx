import React from "react";
import { Timeline } from "react-native-calendars";


const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TaskTimeline: React.FC = () => {
  return <Timeline format24h={true} eventTapped={(e) => e} />;
};

export default TaskTimeline;
