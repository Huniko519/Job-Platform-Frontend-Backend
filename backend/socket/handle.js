const events = require("events");
const eventEmitter = new events.EventEmitter();

/**
 * @description
 * This event that shows the recent message
 * @param
 *  socket
 *  data
 * @returns
 *  @type
 *   type: recentMessage
 *   data : {
 *      message:message
 *      user:userid
 *   }
 */

eventEmitter.on("recentMessage", (socket, data) => {
  console.log("recentEvent Called");
  socket.emit("recentMessage", { type: "recentMessage", data: data });
});

eventEmitter.on("sendToOne", (socket, data) => {
  console.log("sendToOne is called", data);
  socket.emit("sendToOne", data);
});

eventEmitter.on("sendToMany", (groups, data) => {
  switch (data.type) {
    case "newMessage":
      eventEmitter.emit("newMessage", groups, data);
      break;
  }
});

eventEmitter.on("newMessage", (groups, data) => {
  console.log(groups);
  groups.users.map((item) => {
    eventEmitter.emit("sendToOne", item.socket, {
      type: "newMessage",
      data: {
        text: data.message,
        userId: data.userId,
        // position: "right",
        avatar: "/assets/image/avatar.jpg",
        date: new Date(),
      },
    });
  });
});

module.exports = eventEmitter;
