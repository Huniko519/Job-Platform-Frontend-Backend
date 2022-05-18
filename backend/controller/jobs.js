const mongoose = require("mongoose");
const Jobs = require("../models/Job");
const JobService = require("../services/jobs");
const lodash = require("lodash");
const messageServices = require("../services/messages");

const JobStatusesBoard = [
  { value: "created", label: "Created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "board", label: "Sent to Board" },
  { value: "approved", label: "Accepted Job" },
  { value: "pending", label: "Sent to Offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Completed" },
];

const JobStatusesOwner = [
  { value: "created", label: "Created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "pending", label: "Sent Offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Job Completed" },
];

//import the validator
const ValidatorCreateJob = require("../validation/jobs/create");
const { reject } = require("lodash");
const Job = require("../models/Job");

const PiplineByTabBoard = (tab) => {
  switch (tab) {
    case "1":
      return {
        $match: {
          $and: [
            {
              $or: [
                { currentStatus: "board" },
                { currentStatus: "waiting" },
                { currentStatus: "sent" },
                { currentStatus: "approved" },
                { currentStatus: "progress" },
                { currentStatus: "finalize" },
              ],
            },
            { board: true },
          ],
        },
      };
    case "2":
      return {
        $match: {
          $and: [
            {
              $or: [
                { currentStatus: "progress" },
                { currentStatus: "finalize" },
              ],
            },
            { board: true },
          ],
        },
      };
    case "3":
      return {
        $match: {
          $and: [
            {
              $or: [{ currentStatus: "completed" }, { currentStatus: "done" }],
            },
            {
              board: true,
            },
          ],
        },
      };
  }
};

const JobTest = (req, res) => {
  return res.json({ msg: "job api works" });
};

const getBoardJobs = async (req, res) => {
  const pipeline = await PiplineByTabBoard(req.params.tab);
  const result = await JobService.getBoardJobs(pipeline);
  result.data.map((item) => {
    const t = item.messages.messages.map((msg) => {
      return {
        count: msg.mark.filter((userid) => !userid.user.equals(req.user._id))
          .length,
      };
    });
    item.action = lodash.sumBy(t, function (o) {
      return o.count;
    });
  });
  if (result.error) {
    return res.status(200).json(result.data);
  } else {
    return res.json(result.data);
  }
};

const JobCreate = async (req, res) => {
  //const { errors, isValid } = ValidatorCreateJob(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");

  req.files.map((file) => {
    reqFiles.push({ src: url + "/uploads/" + file.filename });
  });
  let status = [];
  console.log(req.body.board == "true" ? "false" : "true");
  //!sent board
  if (req.body.board == "true") {
    console.log("board status is running");
    status = await JobStatusesBoard.map((item) => {
      if (
        item.value == "board" ||
        item.value == "created" ||
        item.value == "waiting"
      ) {
        return {
          value: item.value,
          date: new Date(),
        };
      }
      return { value: item.value, date: null };
    });
    console.log("status", status);
    //! send offer
  } else {
    status = JobStatusesOwner.map((item) => {
      if (item.value == "waiting" || item.value == "created") {
        return {
          value: item.value,
          date: new Date(),
        };
      }
      return { value: item.value, date: null };
    });
  }

  const data = {
    title: req.body.title,
    description: req.body.description,
    attachments: reqFiles,
    status: status,
    currentStatus: req.body.status,
    owner: req.user._id,
    board: req.body.board,
  };

  const result = await JobService.addJob(data);
  //! add channel for message
  const mark = [{ user: req.user._id }];
  const messageData = [
    {
      text: req.body.description,
      position: "right",
      senduser: req.user._id,
      mark: mark,
    },
  ];
  const messageResult = await messageServices.createNewMessage(
    messageData,
    result.data._id
  );
  const updateJobForMessageId = await JobService.updateMessageId(
    messageResult.data._id,
    result.data._id
  );
  if (result.error) {
    return res.status(400).json({ msg: "something wrong" });
  } else {
    return res.json(result.data);
  }
};

const GetJobs = async (req, res) => {
  const pipeline = {
    $match: {
      owner: req.user._id,
    },
  };
  const result = await JobService.getJobs(pipeline);

  result.data.map((item) => {
    const t = item.messages.messages.map((msg) => {
      return {
        count: msg.mark.filter((userid) => userid.user.equals(req.user._id))
          .length,
      };
    });
    item.action = lodash.sumBy(t, function (o) {
      return o.count;
    });
  });

  if (result.error) {
    return res.status(400).json({ msg: result.data });
  } else {
    return res.json(result.data);
  }
};

const GetJobById = async (req, res) => {
  const result = await JobService.getJobById(req.params.id);
  if (result.error) {
    return res.status(400).json({ msg: result.data });
  } else {
    return res.json(result.data);
  }
};

const PiplineByTab = (tab) => {
  switch (tab) {
    case "1":
      return {
        $match: {
          $or: [
            { currentStatus: "waiting" },
            { currentStatus: "pending" },
            { currentStatus: "board" },
            { currentStatus: "approved" },
          ],
        },
      };
    case "2":
      return {
        $match: {
          $or: [{ currentStatus: "progress" }, { currentStatus: "finalize" }],
        },
      };
    case "3":
      return {
        $match: {
          $or: [{ currentStatus: "completed" }, { currentStatus: "done" }],
        },
      };
  }
};

const GetContractorJobs = async (req, res) => {
  let pipline = await PiplineByTab(req.params.tab);
  const result = await JobService.getJobs(pipline);

  if (result.error) {
    return res.status(400).json(result.data);
  } else {
    return res.json(result.data);
  }
};

const ApproveTaskByBoard = async (req, res) => {
  const jobid = req.body.id;
  console.log("jobid", jobid);
  const result = await JobService.ApproveTaskByBoard(jobid);
  if (result.error) {
    return res.status(400).json(result.data);
  } else {
    const jobsResult = await JobService.getJobById(jobid);
    if (jobsResult.error) {
      return res.status(400).json(jobsResult.data);
    } else {
      return res.json(jobsResult.data);
    }
  }
};
module.exports = {
  JobTest,
  JobCreate,
  GetJobs,
  GetJobById,
  GetContractorJobs,
  getBoardJobs,
  ApproveTaskByBoard,
};
