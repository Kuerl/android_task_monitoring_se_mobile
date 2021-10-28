import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Avatar, Card } from "react-native-elements";

type Users = {
  name: string;
  avatar?: string;
  role: "Manager" | "Member";
}[];

const TeamInfo: React.FC = () => {
  const users: Users = [
    {
      name: "Tran Tan Tai",
      role: "Manager",
    },
    {
      name: "Vo Anh Viet",
      role: "Member",
    },
    {
      name: "Nguyen Duc Anh Tai",
      role: "Member",
    },
    {
      name: "Nguyen Le Chi Tam",
      role: "Member",
    },
    {
      name: "Tran Doan Quoc Dat",
      role: "Member",
    },
    {
      name: "Le Thanh Chuong",
      role: "Member",
    },
  ];

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.teamName}>Software Engineer Team</Card.Title>
        <Card.Divider color="black" />
        <Text style={styles.teamDetails}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          distinctio, maiores excepturi doloribus eligendi asperiores aspernatur
          modi expedita molestias laboriosam nostrum ullam ducimus quibusdam!
          Natus ullam voluptatem facilis dicta neque!
        </Text>
        <Card.Divider color="black" />
        <Card.FeaturedTitle style={styles.subTitle}>Members</Card.FeaturedTitle>
        {users.map((u, i) => {
          return (
            <View key={i} style={styles.memberContainer}>
              <Avatar
                size="medium"
                containerStyle={styles.avatar}
                rounded
                title={u.name[0]}
                onPress={() => console.log("Works!")}
              />
              <Text style={styles.memberName}>
                {u.name} {u.role === "Manager" ? "- Manager" : null}
              </Text>
            </View>
          );
        })}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    paddingTop: 80,
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
});

export default TeamInfo;
