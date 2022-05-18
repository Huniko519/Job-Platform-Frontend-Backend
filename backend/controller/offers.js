const OfferService = require("../services/offers");
const JobService = require("../services/jobs");
const { isEmpty } = require("lodash");

const JobStatusesContractor = [
  { value: "created", label: "created" },
  { value: "waiting", label: "Waiting for offer" },
  { value: "pending", label: "Sent Offer" },
  { value: "progress", label: "Work under Progress" },
  { value: "finalize", label: "Request finalisation" },
  { value: "completed", label: "Job Completed" },
];

const AddOffers = async (req, res) => {
  console.log(req.body);
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");

  let status = JobStatusesContractor.map((item) => {
    if (
      item.value == "waiting" ||
      item.value == "pending" ||
      item.value == "created"
    ) {
      return {
        value: item.value,
        date: new Date(),
      };
    } else {
      return {
        value: item.value,
      };
    }
  });
  if (!isEmpty(req.files)) {
    req.files.map((file) => {
      reqFiles.push({ src: url + "/uploads/" + file.filename });
    });
  }

  let data = {
    description: req.body.description,
    price: req.body.price,
    status: status,
    user: req.user._id,
    attachments: reqFiles,
    jobId: req.body.jobid,
    currentStatus: "pending",
  };
  const result = await OfferService.addOffers(data);
  if (result.error) {
    return res.status(400).json({ msg: "something wrong" });
  } else {
    return res.json(result.data);
  }
};

const getOffersByJobId = async (req, res) => {
  const jobid = req.params.id;
  const result = await OfferService.getOffersByJobId(jobid);
  if (result.error) {
    return res.status(400).json({ msg: result.data });
  } else {
    return res.json(result.data);
  }
};

const getOfferDetailByJobId = async (req, res) => {
  const jobid = req.params.id;
  const result = await OfferService.getOfferDetailByJobId(jobid, req.user._id);
  if (result.error) {
    return res.status(400).json({ msg: result.data });
  } else {
    return res.json(result.data);
  }
};

const approveOfferByJobId = async (req, res) => {
  const data = {
    jobId: req.body.jobId,
    id: req.body.id,
  };
  console.log(data);
  const jobResult = await JobService.addOfferByJobId(data, req.body.offer);
  const result = await OfferService.approveOffersByJobId(data, req.body.offer);
  if (result.error) {
    return res.status(400).json({ msg: result.data });
  }
  return res.json(result.data);
};

module.exports = {
  AddOffers,
  getOfferDetailByJobId,
  getOffersByJobId,
  approveOfferByJobId,
};
