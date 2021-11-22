import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";

import { SocialIcon, AirbnbRating, Card, Icon } from "react-native-elements";
import { HomeScreensList } from "../../HomeScreensList";

import { Context as AuthContext, AuthStateType } from "../../../../context/AuthContext";

type InfoProps = StackScreenProps<HomeScreensList, "Info">;
type ContextType = {
  state: AuthStateType;
  signOut: () => void;
}

const InfoScreen: React.FC<InfoProps> = () => {
  const { state, signOut }: ContextType = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.helloTxt}>Hello, {state.firstName} {state.lastName}</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card>
          <Icon
            type="font-awesome"
            name="user-circle"
            color="black"
            size={100}
            iconStyle={styles.avatar}
          />
          <Card.Divider />
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>Username</Text>
            <Text style={styles.txtDetails}>{ state.username }</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>First name</Text>
            <Text style={styles.txtDetails}>{ state.firstName }</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>Last name</Text>
            <Text style={styles.txtDetails}>{ state.lastName }</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>Description</Text>
            <Text style={styles.txtDetails}>{ state.description }</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={[styles.txt, { paddingRight: 28 }]}>New password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={[styles.txt, styles.txtInput]}
            />
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>Confirm password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={[styles.txt, styles.txtInput]}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (
                !(
                  newPassword.replace(/\s/g, "") &&
                  confirmPassword.replace(/\s/g, "")
                )
              ) {
                Alert.alert("You must confirm all terms are fulfilled");
              } else if (newPassword !== confirmPassword) {
                Alert.alert("Your password did not match. Try again");
              } else {
                console.log("Updated password");
                setNewPassword("");
                setConfirmPassword("");
              }
            }}
          >
            <Text style={[styles.btnTxt, { paddingTop: 10, fontSize: 16 }]}>
              Update Password
            </Text>
          </TouchableOpacity>
        </Card>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
        <Text style={styles.btnTxt}>Log out</Text>
      </TouchableOpacity>
      <AirbnbRating />
      <Text style={styles.contactText}>Contact us</Text>
      <View style={styles.iconContainer}>
        <SocialIcon type="facebook" light />
        <SocialIcon type="github-alt" light />
        <SocialIcon type="instagram" light />
        <SocialIcon type="youtube" light />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  helloTxt: {
    marginTop: 30,
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 10,
  },
  txtContainer: {
    flexDirection: "row",
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    width: 120,
  },
  txtDetails: {
    fontSize: 18,
    flex: 1,
    // textAlign: 'center',
    // fontWeight: 'bold',
  },
  txtInput: {
    flex: 1,
    paddingLeft: 10,
  },
  btn: {
    marginHorizontal: 10,
    height: 40,
    marginVertical: 15,
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#edf6ff",
    borderColor: "#2E3191",
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#171b84",
    fontSize: 20,
    alignSelf: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
  },
  contactText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default InfoScreen;
