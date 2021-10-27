import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Divider } from "react-native-elements";

const DrawerContent: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Image
            style={styles.logoImg}
            source={require("../assets/images/iulogo.png")}
          />
          <Text style={styles.headerTxt}>Android Task Monitoring</Text>
        </View>
        <Divider />
      </View>
      <DrawerContentScrollView style={styles.contentContainer} {...props}>
        <Text style={styles.drawerTxt}>Hello, Anh Viet</Text>
        {props.children}
      </DrawerContentScrollView>
      <View>
        <Divider />
        <Text style={styles.footer}>International University - SE Project</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 45,
    backgroundColor: "white",
    zIndex: 1,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  logoImg: {
    width: 60,
    height: 60,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    top: -30,
  },
  drawerTxt: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  footer: {
    paddingTop: 10,
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    paddingBottom: 2,
  },
});

export default DrawerContent;
