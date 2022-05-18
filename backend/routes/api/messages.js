const express = require("express");
const passport = require("passport");
const router = express.Router();

const MessageController = require("../../controller/message");

router.get("/test", MessageController.MessageTest);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  MessageController.CreateMessage
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.GetMessagesByJobId
);

module.exports = router;
