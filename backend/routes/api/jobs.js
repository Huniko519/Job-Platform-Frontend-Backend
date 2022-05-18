const express = require("express");
const passport = require("passport");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const router = express.Router();

const JobsApi = require("../../controller/jobs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.get("/test", JobsApi.JobTest);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.array("uploads", 6),
  JobsApi.JobCreate
);

router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  JobsApi.GetJobs
);

router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  JobsApi.GetJobById
);

router.get(
  "/contractor/:tab",
  passport.authenticate("jwt", { session: false }),
  JobsApi.GetContractorJobs
);

router.get(
  "/board/get/:tab",
  passport.authenticate("jwt", { session: false }),
  JobsApi.getBoardJobs
);

router.post(
  "/board/approveTask",
  passport.authenticate("jwt", { session: false }),
  JobsApi.ApproveTaskByBoard
);

module.exports = router;
