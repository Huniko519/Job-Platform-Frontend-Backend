const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  adminrole: {
    type: String,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  mobile: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: null,
  },
  contactPersonName: {
    type: String,
  },
  contactPersonType: {
    //! client type in client
    type: String,
    default: "Plumber"
  },
  contactCompanyName: {
    //! client name in client
    type: String,
    default: "",
  },
  contactPersonEmail: {
    type: String,
    default: "",
  },
  contactPersonMobile: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "us",
  },
  postalCode: {
    type: Number,
    default: "",
  },
  postalPlace: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: String,
    default: "",
  },
  reNew: {
    type: Date,
    default: Date.now,
  },
  employees: {
    type: Number,
    default: 0,
  },
  access: {
    type: String,
  },
  status: {
    type: String,
  },
  autoSubscript: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
