import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Avatar, Card, Input, Button } from "react-native-elements";
import {
  AuthContextType,
  TeamContextType,
} from "../../../../../context/ContextTypes";
import {
  Context as TeamContext,
  Member,
  TeamType,
} from "../../../../../context/TeamContext";
import { Context as AuthContext } from "../../../../../context/AuthContext";
import { TeamTabList } from "../TeamFlowList";
import { DrawerScreenProps } from "@react-navigation/drawer";
import axios from "../../../../../utils/AxiosBase";
import * as RootNavigation from "../../../../../utils/NavigationRef";

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "TeamInfo">;

const getTeamInfo = (pkTeam_Id: string, teamList: TeamType[]) =>
  teamList.filter((team) => team.pkTeam_Id === pkTeam_Id)[0];

const TeamInfo: React.FC<TeamDrawerProps> = ({ route }) => {
  const { state, loadTeamMembers, loadAllTeam }: TeamContextType =
    useContext(TeamContext);
  const authContext: AuthContextType = useContext(AuthContext);
  const [teamInfo, setTeamInfo] = useState<TeamType>({
    teamName: "Your Team Name",
    pkTeam_Id: "",
    members: [],
  });
  const [manager, setManager] = useState("");
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    loadTeamMembers(route.params);
    setTeamInfo(getTeamInfo(route.params.pkTeam_Id, state.team));
  }, []);

  useEffect(() => {
    teamInfo.members.length
      ? setManager(
          teamInfo.members.filter((mem) => mem.memberRole == "Admin")[0].user
            .username
        )
      : null;
  }, [teamInfo.members]);

  const addTeamMembers = async (pkTeam_Id: string, username: string) => {
    try {
      const res = await axios.post("/team/" + pkTeam_Id, {
        username: [username],
      });
      setNewMember("");
      loadTeamMembers(route.params);
      setTeamInfo(getTeamInfo(route.params.pkTeam_Id, state.team));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const memberPressed = (member: Member) => {
    Alert.alert(
      member.user.username,
      `Description: ${
        member.user.description.length
          ? member.user.description
          : "This member does not have description"
      }\nFirst Name: ${member.user.firstName}\nLast Name: ${
        member.user.lastName
      }\nRole: ${member.memberRole}\nActive: ${member.user.active}`,
      [
        {
          text: "Ok",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              if (
                manager === authContext.state.username &&
                manager !== member.user.username
              ) {
                axios.delete(
                  `/team/${teamInfo.pkTeam_Id}/${authContext.state.username}/duser/${member.user.username}`
                );
                loadTeamMembers(route.params);
              } else {
                Alert.alert("You cannot delete this member!");
              }
            } catch (err) {
              console.log(err);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.teamName}>{teamInfo.teamName}</Card.Title>
        <Card.Divider color="black" />
        <Text style={styles.teamDetails}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          distinctio, maiores excepturi doloribus eligendi asperiores aspernatur
          modi expedita molestias laboriosam nostrum ullam ducimus quibusdam!
          Natus ullam voluptatem facilis dicta neque!
        </Text>
        {manager && manager === authContext.state.username ? (
          <>
            <Text style={styles.addUserTitle}>Add New Member To Team</Text>
            <Input
              placeholder="Add username"
              value={newMember}
              onChangeText={setNewMember}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Button
              disabled={newMember.replace(/\s/g, "").length ? false : true}
              title="Add member"
              onPress={() => addTeamMembers(teamInfo.pkTeam_Id, newMember)}
            />
            <Card.Divider color="black" />
          </>
        ) : null}
        <Card.FeaturedTitle style={styles.subTitle}>Members</Card.FeaturedTitle>
        {teamInfo.members.map((u, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.memberContainer}
              onPress={() => memberPressed(u)}
            >
              <Avatar
                size="medium"
                containerStyle={styles.avatar}
                rounded
                title={u.user.firstName[0]}
                onPress={() => console.log("Works!")}
              />
              <Text style={styles.memberName}>
                {u.user.firstName + " " + u.user.lastName} {" - "}
                {u.user.username}
                {u.memberRole === "Admin" ? " (Manager)" : null}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Card>
      {manager && manager !== authContext.state.username ? (
        <Button
          type="solid"
          title="Out Team"
          buttonStyle={styles.btn}
          onPress={() => {
            axios.delete(
              `/team/${teamInfo.pkTeam_Id}/out/${authContext.state.username}`
            );
            loadAllTeam({ username: authContext.state.username });
            RootNavigation.navigate("ManageTeam");
          }}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    // paddingTop: 80,
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  teamName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  teamDetails: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  subTitle: {
    color: "black",
  },
  addUserTitle: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "black",
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    marginLeft: 10,
  },
  btn: {
    marginTop: 30,
    marginHorizontal: 10,
  },
});

export default TeamInfo;
