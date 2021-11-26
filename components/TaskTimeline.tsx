import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import XDate from "xdate";
import { checkSameDate } from "../utils/checkSameDate";
import {
  CalendarProvider,
  ExpandableCalendar,
  Timeline,
} from "react-native-calendars";

export type EventType = {
  pkTask_Id: number;
  start: string;
  end: string;
  title: string;
  summary: string;
  color?: string;
};

type TimelineProps = {
  events: EventType[];
  refresh: () => void;
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TaskTimeline: React.FC<TimelineProps> = ({ events, refresh }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      refresh();
      setRefreshing(false);
    });
  }, []);

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={(date: Date) => setCurrentDate(date)}
    >
      <ExpandableCalendar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Timeline
          format24h={true}
          eventTapped={(e) => e}
          events={events.filter((event) =>
            checkSameDate(new XDate(event.start), new XDate(currentDate))
          )}
        />
      </ScrollView>
    </CalendarProvider>
  );
};

export default TaskTimeline;
