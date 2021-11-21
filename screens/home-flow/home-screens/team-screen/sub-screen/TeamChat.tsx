import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from "react-native";

import { Icon } from "react-native-elements";

type msg = {
  content: string;
  float: "left" | "right";
};

const MessageView: ListRenderItem<msg> = ({ item }) => {
  return (
    <View
      style={[
        styles.floatContainer,
        item.float === "left" ? styles.floatLeft : styles.floatRight,
      ]}
    >
      <Text
        style={[
          styles.msgContent,
          item.float === "left" ? styles.msgLeft : styles.msgRight,
        ]}
      >
        {item.content}
      </Text>
    </View>
  );
};

const TeamChat: React.FC = () => {
  const [messages, setMessages] = useState<msg[]>([
    { content: "Hello", float: "left" },
    { content: "Hi", float: "right" },
  ]);
  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.msgView}
        renderItem={(item) => <MessageView {...item} />}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.msgInput}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            console.log("SEND MSG");
          }}
        >
          <Icon name="send" type="font-awesome" iconStyle={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  msgView: {
    // paddingTop: 40,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  msgInput: {
    backgroundColor: "#47476b",
    flexDirection: "row",
    padding: 10,
  },
  input: {
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 15,
    height: 40,
    flex: 0.9,
    backgroundColor: "white",
    fontSize: 17,
  },
  btn: {
    flex: 0.1,
    alignSelf: "center",
    justifyContent: "center",
    paddingRight: 5,
    height: 40,
    borderRadius: 10,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
  },
  sendIcon: {
    color: "white",
    fontSize: 30,
  },
  floatContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  floatLeft: {
    justifyContent: "flex-start",
  },
  floatRight: {
    justifyContent: "flex-end",
  },
  msgContent: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
    fontWeight: "700",
    overflow: "hidden",
    color: "white",
  },
  msgLeft: {
    textAlign: "left",
    backgroundColor: "#182533",
  },
  msgRight: {
    textAlign: "right",
    backgroundColor: "#2B769F",
  },
});

export default TeamChat;
