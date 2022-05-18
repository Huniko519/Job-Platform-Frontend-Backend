import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useChat = (userId) => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  //!check for is it mine

  //when component mounts and changes
  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket"],
    });
    socketRef.current.on("mostRecentMessages", (mostRecentMessages) => {
      //on start, set as messages the mostRecentMessages
      //in case the server restarts, we want to replace the current messages
      //with those from database
      //not add more
      setMessages((messages) => [...messages, mostRecentMessages]);
    });

    socketRef.current.on("recentMessage", async ({ type, data }) => {
      console.log("> recentMessage Event called");
      console.log(data.data.data[0].messages);
      let temp = data.data.data[0].messages;
      await temp.map((item) => {
        console.log("userId", userId);
        console.log("item", item.senduser);
        if (item.senduser == userId) {
          console.log("right");
          item.position = "right";
        } else {
          console.log("left");
          item.position = "left";
        }
      });
      setMessages((messages) => temp);
    });

    socketRef.current.on("sendToOne", ({ type, data }) => {
      //append message to the end of array, after using spread operator

      console.log("> New Message event called");
      console.log(data);

      //!check for position
      if (data.userId == userId) {
        data.position = "right";
      } else {
        data.position = "left";
      }

      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //message divided by type

  const divideEvent = (type, data) => {
    switch (type) {
      case "userConnect":
        //!set the userId

        userConnect(data);
        break;
      case "newMessage":
        sendNewMessage(data);
        break;
    }
  };

  //userConnect event

  const userConnect = async (messageObject) => {
    socketRef.current.emit("userConnect", messageObject);
  };

  const sendNewMessage = (messageObject) => {
    socketRef.current.emit("newMessage", messageObject);
  };

  //receive the message

  //message is part of an object

  const sendEvent = (data) => {
    console.log("> sendEvent is called now");
    const type = data.type;
    divideEvent(type, data);
  };

  return { messages, sendEvent };
};

export default useChat;
