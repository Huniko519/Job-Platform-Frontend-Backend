const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  jobid: {
    type: Schema.Types.ObjectId,
    ref: "jobs",
  },
  messages: [
    {
      text: {
        type: String,
      },
      position: {
        type: String,
      },
      date: {
        type: Date,
      },
      senduser: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      mark: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
    },
  ],
});

module.exports = Messages = mongoose.model("messages", MessageSchema);
