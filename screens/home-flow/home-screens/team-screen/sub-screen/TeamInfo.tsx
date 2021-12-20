import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Avatar, Card, Input, Button, Divider } from "react-native-elements";
import {
  AuthContextType,
  LoadingContextType,
  TeamContextType,
} from "../../../../../context/ContextTypes";
import {
  Context as TeamContext,
  Member,
  TeamType,
} from "../../../../../context/TeamContext";
import { Context as LoadingContext } from "../../../../../context/LoadingContext";
import { Context as AuthContext } from "../../../../../context/AuthContext";
import { TeamTabList } from "../TeamFlowList";
import { DrawerScreenProps } from "@react-navigation/drawer";
import AwesomeAlert from "react-native-awesome-alerts";

import axios from "../../../../../utils/AxiosBase";
import * as RootNavigation from "../../../../../utils/NavigationRef";
import { getTeamInfo } from "../../../../../utils/getTeamInfo";
import { wait } from "../../../../../utils/Wait";

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "TeamInfo">;

const AlertComponent: React.FC<Member> = (props) => {
  return (
    <View>
      <Divider style={styles.divider} />
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Member Role: </Text>
        <Text style={styles.contentTxt}>{props.memberRole}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Description: </Text>
        <Text style={styles.contentTxt}>
          {props.user.description.length
            ? props.user.description
            : "This member does not have description"}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>First Name: </Text>
        <Text style={styles.contentTxt}>{props.user.firstName}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Last Name: </Text>
        <Text style={styles.contentTxt}>{props.user.lastName}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelTxt}>Account Status: </Text>
        <Text style={styles.contentTxt}>
          {props.user.active ? "Activating" : "Disabled"}
        </Text>
      </View>
    </View>
  );
};

const TeamInfo: React.FC<TeamDrawerProps> = ({ route }) => {
  const { state, loadTeamMembers, loadAllTeam }: TeamContextType =
    useContext(TeamContext);
  const authContext: AuthContextType = useContext(AuthContext);
  const { setLoading }: LoadingContextType = useContext(LoadingContext);

  const [teamInfo, setTeamInfo] = useState<TeamType>({
    teamName: "Your Team Name",
    pkTeam_Id: "",
    members: [],
  });
  const [manager, setManager] = useState("");
  const [newMember, setNewMember] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [userSelected, setUserSelected] = useState<Member>({
    memberRole: "Member",
    user: {
      username: "",
      firstName: "",
      lastName: "",
      description: "",
      active: false,
    },
  });

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
      setLoading(true);
      const res = await axios.post("/team/" + pkTeam_Id, {
        username: [username],
      });
      wait(1500).then(() => {
        setLoading(false);
        if (res.data.addedMember.length) {
          loadTeamMembers(route.params);
          setTeamInfo(getTeamInfo(route.params.pkTeam_Id, state.team));
          setTimeout(() => {
            Alert.alert("Your team member has been added successfully!");
          }, 100);
        } else if (res.data.exitedMember.length) {
          setTimeout(() => {
            Alert.alert("This user has already been existing!");
          }, 100);
        } else {
          setTimeout(() => {
            Alert.alert(
              "Oops! Something went wrong. This user is not existed!"
            );
          }, 100);
        }
        setNewMember("");
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const memberPressed = (member: Member) => {
    setUserSelected(member);
    setShowAlert(true);
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
                // onPress={() => console.log("Works!")}
              />
              <Text style={styles.memberName}>
                {u.user.firstName + " " + u.user.lastName} {" - "}
                {u.user.username}
                {u.memberRole === "Admin" ? " (Manager)" : null}
              </Text>
            </TouchableOpacity>
          );
        })}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={userSelected.user.username}
          titleStyle={{ fontWeight: "bold", fontSize: 28 }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          customView={<AlertComponent {...userSelected} />}
          cancelText="Cancel"
          confirmText="Delete User"
          confirmButtonColor="red"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            try {
              if (
                manager === authContext.state.username &&
                manager !== userSelected.user.username
              ) {
                Alert.alert(
                  "Are you sure?",
                  "Your team member will be deleted and can be added again later",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Ok",
                      style: "destructive",
                      onPress: () => {
                        setShowAlert(false);
                        setTimeout(async () => {
                          setLoading(true);
                          const res = await axios.delete(
                            `/team/${teamInfo.pkTeam_Id}/${authContext.state.username}/duser/${userSelected.user.username}`
                          );
                          wait(1500).then(() => {
                            setLoading(false);
                            if (res.data.effect) {
                              loadTeamMembers(route.params);
                              setTimeout(() => {
                                Alert.alert(
                                  "Your team member has been deleted successfully!",
                                  "",
                                  [
                                    {
                                      text: "Ok",
                                      onPress: () => setShowAlert(false),
                                    },
                                  ]
                                );
                              }, 100);
                            } else {
                              setTimeout(() => {
                                Alert.alert("Your team member deleted failed!");
                              }, 100);
                            }
                          });
                        }, 100);
                      },
                    },
                  ]
                );
              } else {
                Alert.alert("You cannot delete this member!");
              }
            } catch (err) {
              setLoading(false);
              console.log(err);
            }
          }}
        />
      </Card>
      {manager && manager !== authContext.state.username ? (
        <Button
          type="solid"
          title="Out Team"
          buttonStyle={styles.btn}
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "You cannot join again. Please contact your manager if you want to do this!",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Ok",
                  style: "destructive",
                  onPress: async () => {
                    setLoading(true);
                    try {
                      const res = await axios.delete(
                        `/team/${teamInfo.pkTeam_Id}/out/${authContext.state.username}`
                      );
                      wait(1500).then(() => {
                        setLoading(false);
                        if (res.data.effect) {
                          loadAllTeam({ username: authContext.state.username });
                          RootNavigation.navigate("ManageTeam");
                          setTimeout(() => {
                            Alert.alert("You have lef this team successfully!");
                          }, 100);
                        } else {
                          setTimeout(() => {
                            Alert.alert("Something went wrong!");
                          }, 100);
                        }
                      });
                    } catch (err) {
                      setLoading(false);
                      setTimeout(() => {
                        Alert.alert("Something went wrong!");
                      }, 100);
                    }
                  },
                },
              ]
            );
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
  contentContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "75%",
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
  divider: {
    marginBottom: 15,
  },
});

export default TeamInfo;
