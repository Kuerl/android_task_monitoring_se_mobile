import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { EventType } from "./TaskTimeline";

type EventComponentProps = {
  event: EventType;
};

const EventComponent: React.FC<EventComponentProps> = ({ event }) => {
  const [late, setLate] = useState(false);

  useEffect(() => {
    if (
      event.finalDue &&
      new Date() > new Date(event.finalDue.replace(" ", "T")) &&
      !event.done
    ) {
      setLate(true);
    } else {
      setLate(false);
    }
  }, [event]);

  return (
    <View>
      <Text
        style={[
          styles.eventTitle,
          late ? styles.late : null,
          event.done ? styles.done : null,
        ]}
      >
        {event.title}
      </Text>
      <Text style={[styles.eventSummary, late ? styles.late : null]}>
        {event.summary}
      </Text>
      {event.user ? (
        <Text style={[styles.eventSummary, late ? styles.late : null]}>
          Allocated To: {event.user.username}
        </Text>
      ) : null}
      <Text style={[styles.eventTimes, late ? styles.late : null]}>
        {event.start.slice(11, 16)} - {event.end.slice(11, 16)}
      </Text>
      <Text style={[styles.eventTimes, late ? styles.late : null]}>
        {event.done ? "Done" : "In Progress"} {late ? " - LATE" : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  late: {
    color: "red",
  },
  eventTitle: {
    color: "#615B73",
    fontWeight: "600",
    minHeight: 15,
  },
  eventSummary: {
    color: "#615B73",
    fontSize: 12,
    flexWrap: "wrap",
  },
  eventTimes: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "bold",
    color: "#615B73",
    flexWrap: "wrap",
  },
  done: {
    textDecorationLine: "line-through",
  },
});

export default EventComponent;
