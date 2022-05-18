const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
  // profile part
  registerProfile: async function (data) {
    let result = await User.findOneAndUpdate(
      { _id: data._id },
      { ...data },
      { new: true }
    ).then((res) => {
      return res;
    });
    return result;
  },

  // contractor part
  setContractorStatus: async function (data) {
    let result = await User.findOneAndUpdate(
      { _id: data.id },
      {
        status: data.status,
      },
      { new: true }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    result = {
      id: result.id,
      name: result.contactCompanyName,
      phone: result.contactPersonMobile,
      person: result.contactPersonName,
      status: result.status,
    };

    return result;
  },

  registerContractor: async function (data) {
    let users = await User.find({
      contactPersonEmail: data.contactPersonEmail,
    });
    if (users.length > 0) {
      return { error: true, message: "Already Register" };
    }
    const saveContractor = new User({ ...data });
    let result = await saveContractor
      .save()
      .then((res) => {
        if (res) {
          return { error: false, message: "Success!" };
        }
        return { error: true, message: "Something Wrong! Try again" };
      })
      .catch((err) => {
        return { error: true, message: err };
      });

    return result;
  },

  getUserById: async function (id) {
    let user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
    return user ? user : [];
  },

  updateContractorById: async function (data, id) {
    let result = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { ...data }
    ).then((res) => {
      return { error: false, message: "Success!" };
    });

    return result;
  },

  deleteContractorById: async function (id) {
    let result = await User.deleteOne({ _id: id })
      .then((user) => {
        return { error: false, message: "Success!" };
      })
      .catch((err) => {
        return { error: true, message: err };
      });
    return result;
  },

  getContractors: async function () {
    let result = await User.find({ role: "CONTRACTOR" });
    result = await result.map((item) => {
      return {
        id: item._id,
        name: item.contactCompanyName,
        phone: item.contactPersonMobile,
        person: item.contactPersonName,
        status: item.status,
      };
    });
    return result;
  },

  // super admin part

  getSuperAdmins: async function () {
    let result = await User.find({ role: "SUPER_ADMIN_ROLE" });
    result = await result.map((item) => {
      return {
        id: item._id,
        name: item.contactCompanyName,
        mobile: item.mobile,
      };
    });
    return result;
  },

  registerSuperAdmin: async function (data) {
    let users = await User.find({ email: data.email });
    if (users.length > 0) {
      return { error: true, message: "Already Register" };
    }
    const saveSuperAdmin = new User({ ...data });
    const result = await saveSuperAdmin
      .save()
      .then((res) => {
        if (res) {
          return { error: false, message: "Success!" };
        }
        return { error: true, message: "Something Wrong! Try again" };
      })
      .catch((err) => {
        return { error: true, message: err };
      });

    return result;
  },

  updateSuperAdminById: async function (data) {
    let result = await User.findOneAndUpdate(
      { _id: data.id },
      { ...data }
    ).then((res) => {
      return { error: false, message: "Success!" };
    });

    return result;
  },

  deleteSuperAdminById: async function (data) {
    const result = await User.deleteOne({ _id: data })
      .then((user) => {
        return { error: false, message: "Success!" };
      })
      .catch((err) => {
        return { error: true, message: err };
      });

    return result;
  },

  // client part
  getClients: async function () {
    let result = await User.find({ role: "BOARD_MEMBER" });
    result = await result.map((item) => {
      return {
        id: item._id,
        name: item.contactCompanyName,
        person: item.contactPersonName,
        phone: item.contactPersonMobile,
        renew: item.reNew,
      };
    });

    return result;
  },

  registerClient: async function (data) {
    let users = await User.find({
      contactPersonEmail: data.contactPersonEmail,
    });

    if (users.length > 0) {
      return { error: true, message: "Already Register" };
    }
    const saveClient = new User({ ...data });
    let result = await saveClient
      .save()
      .then((res) => {
        return { error: false, message: "Success" };
      })
      .catch((err) => {
        return { error: true, message: "Validation Error" };
      });

    return result;
  },

  updateClientById: async function (data) {
    let result = await User.findOneAndUpdate({ _id: data.id }, { ...data })
      .then((res) => {
        return { error: false, message: "Success" };
      })
      .catch((err) => {
        return { error: true, message: err };
      });

    return result;
  },

  deleteClientById: async function (data) {
    let result = await User.deleteOne({ _id: data })
      .then((res) => {
        return { error: false, message: "Success!" };
      })
      .catch((err) => {
        return { error: false, message: err };
      });

    return result;
  },
};
