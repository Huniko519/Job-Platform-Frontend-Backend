const express = require("express");
const passport = require("passport");
const router = express.Router();

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const OfferController = require("../../controller/offers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/contractors/");
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  upload.array("uploads", 6),
  OfferController.AddOffers
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  OfferController.getOffersByJobId
);

router.get(
  "/detail/:id",
  passport.authenticate("jwt", { session: false }),
  OfferController.getOfferDetailByJobId
);

router.post(
  "/approve",
  passport.authenticate("jwt", { session: false }),
  OfferController.approveOfferByJobId
);
module.exports = router;
