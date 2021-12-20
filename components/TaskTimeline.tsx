import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import XDate from "xdate";
import { checkSameDate } from "../utils/CheckSameDate";
import {
  CalendarProvider,
  ExpandableCalendar,
  Timeline,
} from "react-native-calendars";
import EventComponent from "./EventComponent";
import * as RootNavigation from "../utils/NavigationRef";

export type EventType = {
  pkTask_Id?: number;
  start: string;
  end: string;
  title: string;
  summary: string;
  user?: { username: string }; // using in TeamTask
  color?: string;
  done?: boolean;
  finalDue?: string;
};

type TimelineProps = {
  events: EventType[];
  refresh: () => void;
  type: "Personal" | "Team";
  pkTeam_Id?: string;
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TaskTimeline: React.FC<TimelineProps> = ({
  events,
  refresh,
  type,
  pkTeam_Id,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const itemPressed = (event: EventType) => {
    Alert.alert(
      event.title,
      `\nSummary: ${
        event.summary.length
          ? event.summary
          : "This task does not have summary information"
      }\n\nStatus: ${event.done ? "Done" : "In Progress"}\n\n${
        type === "Team" && event.user
          ? "Allocated To: " + event.user.username + "\n\n"
          : ""
      }Starting Time: ${event.start} ${
        event.start.length <= 10 ? "00:00" : ""
      }\n\nFinishing Time: ${event.finalDue}\n`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update",
          onPress: () => {
            switch (type) {
              case "Personal":
                RootNavigation.navigate("UpdatePersonalTask", event);
                break;
              case "Team":
                RootNavigation.navigate("UpdateTeamTask", {
                  pkTeam_Id,
                  taskInfo: event,
                });
                break;
            }
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      refresh();
      setRefreshing(false);
    });
  }, []);

  return (
    <CalendarProvider
      showTodayButton
      date={currentDate}
      onDateChanged={(date: Date) => setCurrentDate(date)}
      disabledOpacity={0.6}
    >
      <ExpandableCalendar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Timeline
          format24h={true}
          eventTapped={(e) => itemPressed(e)}
          events={events.filter((event) =>
            checkSameDate(new XDate(event.start), new XDate(currentDate))
          )}
          renderEvent={(e) => <EventComponent event={e} />}
        />
      </ScrollView>
    </CalendarProvider>
  );
};

export default TaskTimeline;
