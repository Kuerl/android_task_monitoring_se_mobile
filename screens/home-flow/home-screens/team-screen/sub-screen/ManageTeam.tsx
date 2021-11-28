import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { TeamStackList } from "../TeamFlowList";
import { FAB } from "react-native-elements";

import { Context as AuthContext } from "../../../../../context/AuthContext";
import { Context as TeamContext } from "../../../../../context/TeamContext";
import {
  AuthContextType,
  TeamContextType,
} from "../../../../../context/ContextTypes";

type TeamStackProps = StackScreenProps<TeamStackList, "ManageTeam">;

const ManageTeam: React.FC<TeamStackProps> = ({ navigation }) => {
  const { state, loadAllTeam }: TeamContextType = useContext(TeamContext);
  const authContext: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    loadAllTeam({ username: authContext.state.username });
  }, []);

  // Control pull down flat list to refresh
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      loadAllTeam({ username: authContext.state.username });
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {state.team.length ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={state.team}
          keyExtractor={(item) => item.pkTeam_Id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("TeamBottomTab", {
                    pkTeam_Id: item.pkTeam_Id,
                  })
                }
              >
                <Text style={styles.text}>{item.teamName}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.emptyItemText}>
            You have not joined any team yet. Contact to your manager or create
            a new team
          </Text>
        </ScrollView>
      )}
      <FAB
        icon={{
          type: "material-community",
          name: "shape-plus",
          color: "white",
        }}
        placement="right"
        onPress={() => navigation.navigate("CreateTeam")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  btn: {
    marginHorizontal: 30,
    height: 60,
    marginVertical: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#3bcdf9",
    borderColor: "#2E3191",
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  emptyItemText: {
    flex: 1,
    fontSize: 28,
    paddingTop: 28,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "lightgrey",
  },
});

export default ManageTeam;
