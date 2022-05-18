const User = require("../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const isEmpty = require("../utils/is-empty");
const jwt = require("jsonwebtoken");

//Load validation
const validateLoginInput = require("../validation/user/login");
const validateRegisterInput = require("../validation/user/register");

//!import userService
const userService = require("../services/user");

const UserTest = (req, res) => {
  res.json({ msg: "User Works" });
};

//register
const UserRegister = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
};

//login
const UserLogin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, role: user.role }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              user: user,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

const getUserCurrent = (req, res) => {
  const payload = { id: req.user.id, name: req.user.name, role: req.user.role };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
    res.json({
      success: true,
      user: user,
      token: "Bearer " + token,
    });
  });
};

// profile parts

const registerProfile = async (req, res) => {
  let registerData = JSON.parse(req.body.data);
  let password = "";

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/uploads/avatar/" + req.file.filename;
    registerData.avatar = fileUrl;
  }

  if (registerData.pass) {
    password = await new Promise((resolve) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(registerData.pass, salt, (err, hash) => {
          if (err) throw err;
          resolve(hash);
        });
      });
    });

    registerData.password = password;
  }
  let result = await userService.registerProfile(registerData);
  return res.json(result);
};

// contractor parts

const setContractorStatus = async (req, res) => {
  let result = await userService.setContractorStatus(req.body);
  console.log(result);
  return res.json(result);
};

const registerContractor = async (req, res) => {
  let registerData = JSON.parse(req.body.data);
  console.log(req.body.isSent);
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/uploads/avatar/" + req.file.filename;
    registerData.avatar = fileUrl;
  }
  registerData.role = "CONTRACTOR";

  if (req.body.isSent == "sent") {
    registerData.status = "Waiting";
  } else {
    registerData.status = "New";
  }
  let result = await userService.registerContractor(registerData);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  let userid = req.params.id;
  const user = await userService.getUserById(userid);
  return res.json(user);
};

const updateContractorById = async (req, res) => {
  let updateData = JSON.parse(req.body.data);
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/uploads/avatar/" + req.file.filename;
    updateData.avatar = fileUrl;
  }
  updateData.role = "CONTRACTOR";
  let result = await userService.updateContractorById(updateData, req.body.id);
  return res.json(result);
};

const deleteContractorById = async (req, res) => {
  let result = await userService.deleteContractorById(req.params.id);
  return res.json(result);
};

const getContractors = async (req, res) => {
  let result = await userService.getContractors();
  res.json(result);
};

// super admin parts

const getSuperAdmins = async (req, res) => {
  let result = await userService.getSuperAdmins();
  res.json(result);
};

const registerSuperAdmin = async (req, res) => {
  let password = await new Promise((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash("11111111", salt, (err, hash) => {
        if (err) throw err;
        resolve(hash);
      });
    });
  });

  let registerData = JSON.parse(req.body.data);

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/uploads/avatar/" + req.file.filename;
    registerData.avatar = fileUrl;
  }

  registerData.role = "SUPER_ADMIN_ROLE";
  registerData.password = password;
  let result = await userService.registerSuperAdmin(registerData);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.json(result);
};

const updateSuperAdminById = async (req, res) => {
  let updateData = JSON.parse(req.body.data);

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/uploads/avatar/" + req.file.filename;
    updateData.avatar = fileUrl;
  }
  updateData.role = "SUPER_ADMIN_ROLE";
  updateData.id = req.body.id;

  let result = await userService.updateSuperAdminById(updateData);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.json(result);
};

const deleteSuperAdminById = async (req, res) => {
  let result = await userService.deleteSuperAdminById(req.params.id);
  return res.json(result);
};

// clients part

const getClients = async (req, res) => {
  let result = await userService.getClients();
  res.json(result);
};

const registerClient = async (req, res) => {
  let registerData = JSON.parse(req.body.data);

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileURL = url + "/uploads/avatar/" + req.file.filename;
    registerData.avatar = fileURL;
  }
  registerData.role = "BOARD_MEMBER";
  let result = await userService.registerClient(registerData);

  if (result.error) {
    return res.status(400).json(result);
  }

  return res.json(result);
};

const updateClientById = async (req, res) => {
  let updateData = JSON.parse(req.body.data);

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const fileURL = url + "/uploads/avatar/" + req.file.filename;
    updateData.avatar = fileURL;
  }

  updateData.id = req.body.id;
  updateData.role = "BOARD_MEMBER";
  let result = await userService.updateClientById(updateData);
  if (result.error) {
    return res.status(400).json(result);
  }

  return res.json(result);
};

const deleteClientById = async (req, res) => {
  let result = await userService.deleteClientById(req.params.id);
  return res.json(result);
};

module.exports = {
  UserTest,
  UserLogin,
  UserRegister,
  registerProfile,
  getUserCurrent,
  setContractorStatus,
  registerContractor,
  getUserById,
  updateContractorById,
  deleteContractorById,
  getContractors,
  getSuperAdmins,
  registerSuperAdmin,
  updateSuperAdminById,
  deleteSuperAdminById,
  getClients,
  registerClient,
  updateClientById,
  deleteClientById,
};
