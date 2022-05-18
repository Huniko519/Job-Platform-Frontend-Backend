import axios from "../axios";

class UserService {
  //! profile part
  getProfile() {
    return axios
      .post("users/current")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return null;
      });
  }

  registerProfile(formdata) {
    return axios
      .post("users/registerprofile", formdata)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  updateProfile(username, data) {
    const profileData = {
      givenname: data.givenName,
      surname: data.surname,
      username: data.username,
      email: data.email,
      mobileNo: data.phoneNo,
      address: data.address,
      post_number: data.post_number,
      post_office: data.post_office,
      apartment_no: data.apartment_no,
    };
    return axios
      .put("me/" + username, profileData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return null;
      });
  }

  //!contractor part

  registerContractor(formdata) {
    return axios
      .post("users/registercontractor", formdata)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  }

  setContractorStatus(status) {
    return axios
      .post("users/setstatus", status)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  }

  getUserById(id) {
    return axios
      .get(`users/get/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  }

  updateContractorById(formdata) {
    return axios
      .post("users/updatecontractor", formdata)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  }

  deleteContractorById(id) {
    return axios
      .delete(`users/deletecontractor/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  getContractors() {
    return axios
      .get("users/contractors")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  //!super admin part

  getSuperAdmins() {
    return axios
      .get("users/superadmins")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  registerSuperAdmin(formdata) {
    return axios
      .post("users/registersuperadmin", formdata)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  updateSuperAdminById(formdata) {
    return axios
      .post("users/updatesuperadmin", formdata)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  deleteSuperAdminById(id) {
    return axios
      .delete(`users/deletesuperadmin/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  // clients part

  getClients() {
    return axios
      .get("users/clients")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  registerClient(data) {
    return axios
      .post("users/registerclient", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  updateClientById(data) {
    return axios
      .post("users/updateclient", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }

  deleteClientById(id) {
    return axios
      .delete(`users/deleteclient/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  }
}

export default new UserService();
