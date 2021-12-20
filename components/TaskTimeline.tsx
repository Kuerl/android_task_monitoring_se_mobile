import React, { useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from "react-native";
import XDate from "xdate";
import { checkSameDate } from "../utils/CheckSameDate";
import {
  CalendarProvider,
  ExpandableCalendar,
  Timeline,
} from "react-native-calendars";
import EventComponent from "./EventComponent";
import AwesomeAlert from "react-native-awesome-alerts";
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
  pkTeam_Id?: string;
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AlertComponent: React.FC<EventType> = (props) => {
  return (
    <View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Summary: </Text>
        <Text style={styles.contentTxt}>
          {props.summary.length
            ? props.summary
            : "This task does not have summary information"}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Status: </Text>
        <Text style={styles.contentTxt}>
          {props.done ? "Done" : "In Progress"}
        </Text>
      </View>
      {props.user ? (
        <View style={styles.contentContainer}>
          <Text style={styles.labelTxt}>Allocated To: </Text>
          <Text style={styles.contentTxt}>{props.user.username}</Text>
        </View>
      ) : null}
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Starting Time: </Text>
        <Text style={styles.contentTxt}>
          {props.start} {props.start.length <= 10 ? "00:00" : ""}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Finishing Time: </Text>
        <Text style={styles.contentTxt}>{props.finalDue}</Text>
      </View>
    </View>
  );
};

const TaskTimeline: React.FC<TimelineProps> = ({
  events,
  refresh,
  pkTeam_Id,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showAlert, setShowAlert] = useState(false);
  const [event, setEvent] = useState<EventType>({
    pkTask_Id: 0,
    start: "",
    end: "",
    title: "Event Title",
    summary: "This event does not have summary information",
    user: { username: "" }, // using in TeamTask
    color: "",
    done: false,
    finalDue: "",
  });

  const itemPressed = (event: EventType) => {
    setEvent(event);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
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
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={event.title}
          titleStyle={{ fontWeight: "bold", fontSize: 28 }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Update Task"
          confirmButtonColor="#DD6B55"
          customView={<AlertComponent {...event} />}
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
            if (event.user) {
              RootNavigation.navigate("UpdateTeamTask", {
                pkTeam_Id,
                taskInfo: event,
              });
            } else {
              RootNavigation.navigate("UpdatePersonalTask", event);
            }
          }}
        />
      </ScrollView>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  labelTxt: {
    fontWeight: "bold",
    marginRight: 10,
  },
  contentTxt: {
    fontStyle: "italic",
    textAlign: "left",
  },
});

export default TaskTimeline;
