import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-elements";
import { DrawerScreenProps } from "@react-navigation/drawer";

import TaskTimeline from "../../../../../components/TaskTimeline";
import { TeamTabList } from "../TeamFlowList";
import { Context as TeamTaskContext } from "../../../../../context/TeamTaskContext";
import { TeamTaskContextType } from "../../../../../context/ContextTypes";
import { splitTask } from "../../../../../utils/SplitTask";

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "TeamTask">;

const TeamTaskScreen: React.FC<TeamDrawerProps> = ({ navigation, route }) => {
  const { state, loadTask }: TeamTaskContextType = useContext(TeamTaskContext);

  useEffect(() => {
    loadTask(route.params);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <TaskTimeline
        events={splitTask(state.tasks)}
        refresh={() => loadTask(route.params)}
      />
      <FAB
        color="#439DE4"
        icon={{ type: "feather", name: "plus", color: "white" }}
        placement="right"
        onPress={() =>
          navigation.navigate("AddTeamTask", {
            pkTeam_Id: route.params.pkTeam_Id,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  header: {
    // paddingTop: 35,
    backgroundColor: "white",
  },
  emptyItemText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default TeamTaskScreen;
