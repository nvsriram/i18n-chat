import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useMemo, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { IAvatar, IMessage, IRoomEvent, MSG_TYPES } from "./helpers/types";
import Chatroom from "./pages/Chatroom";
import JoinRoom from "./pages/JoinRoom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [userID, setUserID] = useState(-1);
  const [username, setUsername] = useState("");
  const [lang, setLang] = useState("en");
  const [client, setClient] = useState<any>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [roomEvents, setRoomEvents] = useState<IRoomEvent[]>([]);

  const avatars: IAvatar = useMemo(() => {
    let newAvatars: IAvatar = {};
    const users = [
      ...new Set(roomEvents.map((roomEvent) => roomEvent.username)),
    ];
    users.forEach((user) => {
      newAvatars[user] = createAvatar(personas, {
        size: 40,
        seed: user,
      }).toDataUriSync();
    });
    return newAvatars;
  }, [roomEvents]);

  useEffect(() => {
    if (!isLoggedIn || userID > 0) return;
    const newClient = new W3CWebSocket(
      `ws://${import.meta.env.VITE_SERVER_URL}/ws/chat/${roomName}/`
    );
    newClient.onopen = () => {
      console.log("Websocket connected!");
      setClient(newClient);
      if (userID === -1) {
        newClient.send(
          JSON.stringify({
            msg_type: MSG_TYPES.JOINED,
            username: username,
            lang: lang,
          })
        );
      }
    };

    newClient.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        const { msg_type, message, user_id, username, lang, timestamp } =
          dataFromServer;
        // handle based on msg_type
        switch (msg_type) {
          case MSG_TYPES.JOINED:
            setRoomEvents((prevEvents) => [
              ...prevEvents,
              {
                msg_type: msg_type,
                timestamp: timestamp,
                username: username,
              },
            ]);
            if (userID === -1) {
              setUserID(user_id);
            }
            break;
          case MSG_TYPES.MESSAGE:
            setRoomEvents((prevEvents) => [
              ...prevEvents,
              {
                msg_type: msg_type,
                message: message,
                timestamp: timestamp,
                user_id: user_id,
                username: username,
                lang: lang,
              },
            ]);
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                message: message,
                timestamp: timestamp,
                username: username,
                lang: lang,
              },
            ]);
            break;
          default:
            console.log("unexpected msg_type", msg_type);
        }
      }
    };
  }, [isLoggedIn, lang, username, roomName, userID]);

  const sendMessage = (input: string) => {
    client.send(
      JSON.stringify({
        msg_type: MSG_TYPES.MESSAGE,
        message: input,
        user_id: userID,
        username: username,
        lang: lang,
      })
    );
  };

  if (!isLoggedIn) {
    return (
      <JoinRoom
        setRoomName={setRoomName}
        setUsername={setUsername}
        setLang={setLang}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <Chatroom
      room={roomName}
      username={username}
      lang={lang}
      roomEvents={roomEvents}
      messages={messages}
      avatars={avatars}
      onButtonClicked={sendMessage}
    />
  );
};

export default App;
