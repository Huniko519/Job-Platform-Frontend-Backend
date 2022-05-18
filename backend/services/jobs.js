const { reject } = require("lodash");
const mongoose = require("mongoose");
const Job = require("../models/Job");
const Jobs = require("../models/Job");
const Messages = require("../models/Message");

module.exports = {
  getBoardJobs: function (pipeline) {
    const result = new Promise((resolve, reject) => {
      Jobs.aggregate([
        pipeline,
        {
          $lookup: {
            from: "messages",
            localField: "message",
            foreignField: "_id",
            as: "messages",
          },
        },
        {
          $unwind: "$messages",
        },
      ])
        .then((res) => {
          resolve({ error: false, data: res });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  getJobById: function (id) {
    const result = new Promise((resolver, reject) => {
      Jobs.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            title: 1,
            description: 1,
            status: 1,
            currentStatus: 1,
            attachments: 1,
            Date: 1,
            contactPerson: "$user.name",
            userid: "$user._id",
            role: "$user.role",
            offer: 1,
            board: 1,
          },
        },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "_id",
            as: "offer",
          },
        },
        {
          $unwind: { path: "$offer", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "users",
            localField: "offer.user",
            foreignField: "_id",
            as: "contractor",
          },
        },
        {
          $unwind: {
            path: "$offer.contractor",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
        .then((response) => {
          resolver({ error: false, data: response });
        })
        .catch((err) => {
          console.log(err);
          resolver({ error: true, data: err });
        });
    });
    return result;
  },
  getJobs: function (pipeline) {
    const result = new Promise(async (resolve, reject) => {
      Jobs.aggregate([
        pipeline,
        {
          $lookup: {
            from: "messages",
            localField: "message",
            foreignField: "_id",
            as: "messages",
          },
        },
        {
          $unwind: "$messages",
        },
      ])
        .then((response) => {
          resolve({ error: false, data: response });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });

    return result;
  },
  addJob: function (data) {
    const newJob = new Jobs({
      ...data,
    });
    const result = new Promise((resolve, reject) => {
      newJob
        .save()
        .then((result) => {
          resolve({ error: false, data: result });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  addOfferByJobId: async function (data, offer) {
    const result = new Promise((resolve, reject) => {
      Jobs.findOne({ _id: mongoose.Types.ObjectId(data.jobId) }).then((res) => {
        //! if progress
        if (offer == "progress") {
          res.offer = data.id;
          res.status.filter((item) => item.value == "pending")[0].date =
            new Date();
        }

        res.offer = data.id;
        res.currentStatus = offer;
        res.status.filter((item) => item.value == offer)[0].date = new Date();
        res
          .save()
          .then((res) => {
            resolve({ error: false, data: res });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }).catch((err) => {
      resolve({ error: true, data: err });
    });
    return result;
  },
  updateMessageId: async function (messageid, jobid) {
    const result = new Promise((resolve, reject) => {
      Jobs.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(jobid) },
        { message: mongoose.Types.ObjectId(messageid) }
      )
        .then((res) => {
          resolve({ error: false, data: res });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
  },
  ApproveTaskByBoard: async function (jobid) {
    const result = await new Promise((resolve, reject) => {
      Jobs.findOne({ _id: mongoose.Types.ObjectId(jobid) }).then((job) => {
        job.status.filter((item) => item.value == "approved")[0].date =
          new Date();
        job.currentStatus = "approved";
        job.save().then((res) => {
          resolve({ error: false, data: res });
        });
      });
    });
    return result;
  },
};
