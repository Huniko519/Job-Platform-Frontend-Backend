const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

// configuring enviroment
const dotenv = require("dotenv");
dotenv.config();

//import socket

//import apis
const users = require("./routes/api/users");
const jobs = require("./routes/api/jobs");
const messages = require("./routes/api/messages");
const offers = require("./routes/api/offers");
const test = require("./routes/api/test");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Allow Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(passport.initialize());
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/jobs", jobs);
app.use("/api/messages", messages);
app.use("/api/offers", offers);
app.use("/api/tests", test);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = require("http").createServer(app);
const io = require("./socket/")(server);
// server.listen(8080, () => console.log("Socket server is running on port 8080"));
server.listen(port, () => console.log(`Server running on port ${port}`));
