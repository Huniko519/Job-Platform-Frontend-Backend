const express = require("express");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const User = require("../../controller/users");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar");
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

// profile part

router.get("/test", User.UserTest);

router.post("/login", User.UserLogin);

router.post("/register", User.UserRegister);

router.post("/registerprofile", upload.single("file"), User.registerProfile);

router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  User.getUserCurrent
);

// contractor part

router.post(
  "/registercontractor",
  upload.single("file"),
  User.registerContractor
);

router.post("/setstatus", User.setContractorStatus);

router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  User.getUserById
);

router.post(
  "/updatecontractor",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  User.updateContractorById
);

router.delete(
  "/deletecontractor/:id",
  passport.authenticate("jwt", { session: false }),
  User.deleteContractorById
);

router.get("/contractors", User.getContractors);

// super admin part

router.get("/superadmins", User.getSuperAdmins);

router.post(
  "/registersuperadmin",
  upload.single("file"),
  User.registerSuperAdmin
);

router.post(
  "/updatesuperadmin",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  User.updateSuperAdminById
);

router.delete("/deletesuperadmin/:id", User.deleteSuperAdminById);

// client part

router.get("/clients", User.getClients);

router.post("/registerclient", upload.single("file"), User.registerClient);

router.post("/updateclient", upload.single("file"), User.updateClientById);

router.delete(
  "/deleteclient/:id",
  passport.authenticate("jwt", { session: false }),
  User.deleteClientById
);

module.exports = router;
