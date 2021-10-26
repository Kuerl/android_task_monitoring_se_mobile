import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SwitchAction } from "./AddTaskForm";

type DateTimePickerProps = {
  name: "START" | "FINISH";
  value: {
    dateSwitch: boolean;
    timeSwitch: boolean;
    date: string;
    time: string;
  };
  setValue: {
    switchDispatch: React.Dispatch<SwitchAction>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setTime: React.Dispatch<React.SetStateAction<string>>;
  };
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  value,
  setValue,
}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [show, setShow] = useState(false);
  const { dateSwitch, timeSwitch, date, time } = value;
  const { switchDispatch, setDate, setTime } = setValue;

  const setNewDaySelected = (date: string) => {
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
    };
    setMarkedDates(markedDate);
    setDate(date);
  };

  const handleConfirm = (selectedDate: Date) => {
    hideTimePicker();
    const selectedTime = selectedDate.toString().slice(16, 21);
    setTime(selectedTime);
  };

  const hideTimePicker = () => {
    setShow(false);
  };

  useEffect(() => {
    const offset = new Date().getTimezoneOffset() * 60000; // Get offset between local timezone and UTC in miliseconds
    const today = new Date(Date.now() - offset).toISOString().split("T")[0];
    setNewDaySelected(today);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Fontisto name="date" style={styles.icon} />
        <Text style={styles.txt}>{name} Date</Text>
        <Switch
          value={dateSwitch}
          onValueChange={() =>
            switchDispatch({ type: "SWITCH_DATE", payload: name })
          }
        />
      </View>
      {dateSwitch && !timeSwitch && (
        <Calendar
          markedDates={markedDates}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setNewDaySelected(day.dateString);
          }}
        />
      )}
      {timeSwitch && (
        <Text style={[styles.txt, styles.selectedTxt]}>{date}</Text>
      )}
      <View style={styles.switchContainer}>
        <Ionicons name="time-outline" style={styles.icon} />
        <Text style={styles.txt}>{name} Time</Text>
        <Switch
          value={timeSwitch}
          onValueChange={() => {
            switchDispatch({ type: "SWITCH_TIME", payload: name });
            // Use timeSwitch b/c the state value is changed but don't update yet
            if (!timeSwitch) {
              setShow(true);
            }
          }}
        />
      </View>
      <DateTimePickerModal
        isVisible={show}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      {timeSwitch && !show && (
        <Text style={[styles.txt, styles.selectedTxt]}>{time}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  txt: {
    fontSize: 20,
    flex: 1,
    color: "white",
  },
  selectedTxt: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: "white",
  },
});

export default DateTimePicker;
