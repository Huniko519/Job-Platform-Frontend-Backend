const mongoose = require("mongoose");

const messageModel = require("../models/Message");

module.exports = {
  createNewMessage: function (data, jobid) {
    const newMessage = new messageModel({
      jobid: jobid,
      messages: data,
    });
    const result = new Promise((resolve, reject) => {
      newMessage
        .save()
        .then((response) => {
          resolve({ error: false, data: response });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  getMessagesByJobId: async function (jobid) {
    const result = await new Promise((resolve, reject) => {
      messageModel
        .find({ jobid: jobid })
        .then((response) => {
          resolve({ error: false, data: response });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  getRecentMessages: async function (channelId) {
    const result = await new Promise((resolve, reject) => {
      messageModel
        .find({ _id: mongoose.Types.ObjectId(channelId) })
        .then((message) => {
          if (message) {
            resolve({ error: false, data: message });
          } else {
            resolve({ error: true, data: [] });
          }
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  addNewMessage: async function (data) {
    const result = await new Promise((resolve, reject) => {
      messageModel
        .findOne({ _id: mongoose.Types.ObjectId(data.channelId) })
        .then((message) => {
          if (message) {
            let UpdateMessage = message.messages;
            let pushObject = {
              text: data.message,
              senduser: mongoose.Types.ObjectId(data.userId),
              position: "right",
              mark: [{ user: data.userId }],
            };
            UpdateMessage.push(pushObject);
            message.save().then((res) => {
              if (res) {
                resolve({ error: false });
              } else {
                resolve({ error: true });
              }
            });
          } else {
            resolve({ error: true });
          }
        });
    });
    return result;
  },
};
