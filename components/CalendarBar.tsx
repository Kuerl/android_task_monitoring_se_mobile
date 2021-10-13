import React from "react";
import { View, StyleSheet } from "react-native";

import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";

const CalendarBar: React.FC = ({ children }) => {
  return (
    <CalendarProvider date={new Date()}>
      <View style={styles.header}>
        <ExpandableCalendar />
      </View>
      {children}
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    backgroundColor: "white",
  },
});

export default CalendarBar;
