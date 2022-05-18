const Offers = require("../models/Offers");
const mongoose = require("mongoose");
module.exports = {
  getOffersByJobId: async function (jobId) {
    const result = await new Promise((resolve, reject) => {
      Offers.aggregate([
        {
          $match: {
            jobId: mongoose.Types.ObjectId(jobId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "contractors",
          },
        },
        {
          $unwind: "$contractors",
        },
      ])
        .then((offers) => {
          resolve({ error: false, data: offers });
        })
        .catch((err) => {
          console.log(err);
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  getOfferDetailByJobId: async function (jobId, userid) {
    const result = await new Promise((resolve, reject) => {
      Offers.aggregate([
        {
          $match: {
            $and: [
              { jobId: mongoose.Types.ObjectId(jobId) },
              { user: mongoose.Types.ObjectId(userid) },
            ],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "contractors",
          },
        },
        {
          $unwind: "$contractors",
        },
      ])
        .then((offers) => {
          resolve({ error: false, data: offers });
        })
        .catch((err) => {
          console.log(err);
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  addOffers: async function (data) {
    const newOffers = new Offers({
      ...data,
    });
    const result = await new Promise((resolve, reject) => {
      newOffers
        .save()
        .then((res) => {
          resolve({ error: false, data: res });
        })
        .catch((err) => {
          resolve({ error: true, data: err });
        });
    });
    return result;
  },
  approveOffersByJobId: async function (data, offer) {
    const result = new Promise((resolve, reject) => {
      Offers.findOne({
        _id: mongoose.Types.ObjectId(data.id),
        jobId: data.jobId,
      }).then((res) => {
        if (res) {
          //!if progress
          if (offer == "pending") {
            res.status.filter((item) => item.value == "pending")[0].date =
              new Date();
          }

          res.status.filter((item) => item.value === offer)[0].date =
            new Date();
          res.currentStatus = offer;
          res
            .save()
            .then((offerResult) => {
              resolve({ error: false, data: offerResult });
            })
            .catch((err) => {
              resolve({ error: true, data: err });
            });
        }
      });
    });
    return result;
  },
};
