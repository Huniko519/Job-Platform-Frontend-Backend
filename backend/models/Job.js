const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  boardid: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  board: {
    type: Boolean,
    default: false,
  },
  status: [
    {
      value: {
        type: String,
      },
      date: {
        type: Date,
        default: null,
      },
    },
  ],
  currentStatus: {
    type: String,
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: "messages",
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  attachments: [
    {
      src: {
        type: String,
      },
    },
  ],
  offer: {
    type: Schema.Types.ObjectId,
    ref: "offers",
    default: null,
  },
});

module.exports = Jobs = mongoose.model("jobs", JobSchema);
