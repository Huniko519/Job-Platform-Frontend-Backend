const mongoose = require("mongoose");
const messageService = require("../services/messages");
const { isEmpty } = require("lodash");

const eventEmitter = require("./handle");

// const io = socket(8080);
let groups = [];

module.exports = async function (app) {
  const io = require("socket.io")(app);
  io.on("connection", (socket) => {
    console.log("connection established");

    /**
     * @param
     *    # messageId
     *    # userId
     * @return
     *
     */

    socket.on("userConnect", async (data) => {
      console.log("userConnect ...");
      console.log(data);
      if (
        !isEmpty(groups.filter((group) => group.channelId == data.messageId))
      ) {
        console.log("this group is in saved groups");
        let checkGroups = groups.filter(
          (item) => item.channelId == data.messageId
        )[0];
        // console.log(checkGroups);
        if (!isEmpty(checkGroups)) {
          if (!checkGroups.users.filter((item) => item.id == data.userId)[0]) {
            checkGroups.users.push({ id: data.userId, socket: socket });
          } else {
            checkGroups.users.filter(
              (item) => item.id == data.userId
            )[0].socket = socket;
          }
        }
      } else {
        console.log("this group isn't in saved groups");
        let groupData = {
          channelId: data.messageId,
          users: [
            {
              id: data.userId,
              socket: socket,
            },
          ],
        };
        groups.push(groupData);
      }
      const result = await messageService.getRecentMessages(data.messageId);

      console.log(">recentMessage Event");
      console.log(result);

      if (result.error) {
        let data = {
          type: "recentMessage",
          data: [],
        };
        eventEmitter.emit("recentMessage", socket, data);
      } else {
        let data = {
          type: "recentMessage",
          data: result,
        };
        eventEmitter.emit("recentMessage", socket, data);
      }
    });

    /**
     * @param
     *    #Message
     *    #userid
     *    #messageId
     * @returns
     *    send all users in channel and save the db
     *
     * */

    socket.on("newMessage", (data) => {
      console.log("new Message Event called");
      console.log(data);
      let result = messageService.addNewMessage(data);
      const group = groups.filter(
        (item) => item.channelId == data.channelId
      )[0];
      console.log(group);
      eventEmitter.emit("newMessage", group, data);
    });
  });
};

// server.listen(8080, () => {
//   console.log("socket server is running in port 8080");
// });.
