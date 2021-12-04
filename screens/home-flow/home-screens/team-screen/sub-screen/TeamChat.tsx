import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { TeamTabList } from "../TeamFlowList";

import axios from "../../../../../utils/AxiosBase";
import { Context as AuthContext } from "../../../../../context/AuthContext";
import { AuthContextType } from "../../../../../context/ContextTypes";

import { io } from "socket.io-client";

type Message = {
  username: string;
  createdDate: string;
  content: string;
  float: "left" | "right";
};

type FetchedMessages = {
  message: string;
  flag: boolean;
  create_up: string;
  username: string;
};

type TeamDrawerProps = DrawerScreenProps<TeamTabList, "TeamChat">;

const MessageView: ListRenderItem<Message> = ({ item }) => {
  return (
    <View
      style={[
        styles.floatContainer,
        item.float === "left" ? styles.floatLeft : styles.floatRight,
      ]}
    >
      <Text style={styles.infoTxt}>{item.username}</Text>
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

const TeamChat: React.FC<TeamDrawerProps> = ({ route }) => {
  const { state }: AuthContextType = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const msgsListRef = useRef<FlatList>(null);

  // Effect to fetch all team msg before
  useEffect(() => {
    async function fetchAllMsgs() {
      try {
        type MsgsType = {
          data: FetchedMessages[];
        };
        const msgs: MsgsType = await axios.get(
          `/message/${route.params.pkTeam_Id}`
        );
        // Sort all the msgs in order of increasing created time
        msgs.data.sort((a: FetchedMessages, b: FetchedMessages) =>
          new Date(a.create_up) > new Date(b.create_up) ? 1 : 0
        );
        // Set the data to state
        setMessages([]); // Clear old msgs first
        msgs.data.map((mes) => {
          setMessages((prevMsg) => [
            ...prevMsg,
            {
              username: mes.username,
              createdDate: mes.create_up,
              content: mes.message,
              float: mes.username === state.username ? "right" : "left",
            },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllMsgs();
    // Initialzie socket
    const socket = io("http://128.199.66.87:3000");
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    // Listen to the team channel
    socket.on(`${route.params.pkTeam_Id}`, (msg: FetchedMessages) => {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        {
          username: msg.username,
          createdDate: msg.create_up,
          content: msg.message,
          float: msg.username === state.username ? "right" : "left",
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={msgsListRef}
        style={styles.msgView}
        renderItem={(item) => <MessageView {...item} />}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() =>
          msgsListRef.current ? msgsListRef.current.scrollToEnd() : null
        }
        onLayout={() =>
          msgsListRef.current ? msgsListRef.current.scrollToEnd() : null
        }
      />
      <View style={styles.msgInput}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} />
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            try {
              await axios.post(
                `/message/${route.params.pkTeam_Id}/${state.username}`,
                { message: input, flag: false }
              );
              setInput("");
            } catch (err) {
              console.log(err);
            }
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
    marginTop: 30,
    flexDirection: "row",
  },
  floatLeft: {
    justifyContent: "flex-start",
  },
  floatRight: {
    justifyContent: "flex-end",
  },
  infoTxt: {
    color: "white",
    position: "absolute",
    top: -20,
    paddingHorizontal: 5,
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
