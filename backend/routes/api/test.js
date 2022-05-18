const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Server Running Successful!" });
});

module.exports = router;
