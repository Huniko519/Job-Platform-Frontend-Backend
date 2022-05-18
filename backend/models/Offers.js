const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "jobs",
  },
  description: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
    required: true,
  },
  attachments: [
    {
      src: {
        type: String,
      },
    },
  ],
  status: [
    {
      value: {
        type: String,
      },
      date: {
        type: Date,
        default: "",
      },
    },
  ],
});

module.exports = Offers = mongoose.model("offers", OfferSchema);
