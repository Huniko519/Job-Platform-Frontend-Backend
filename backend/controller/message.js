const messageServices = require("../services/messages");

const MessageTest = (req, res) => {
  res.json({ msg: "Message Works" });
};

const CreateMessage = async (req, res) => {
  const mark = [{ user: req.user._id }];
  const data = [
    {
      text: req.body.text,
      position: req.body.position,
      senduser: req.user._id,
      mark: mark,
    },
  ];
  const result = await messageServices.createNewMessage(data, req.body.jobid);
  if (result.error) {
    return res.status(200).json(result.data);
  } else {
    return res.json(result);
  }
};

const GetMessagesByJobId = async (req, res) => {
  // return res.json(req.params.id);
  const result = await messageServices.getMessagesByJobId(req.params.id);
  if (result.error) {
    return res.status(200).json(result.data);
  } else {
    return res.json(result.data);
  }
};

module.exports = {
  MessageTest,
  CreateMessage,
  GetMessagesByJobId,
};
