import axios from "../axios";
import jwt_decode from "jwt-decode";
class AuthService {
  login(email, password) {
    return axios
      .post("users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          const decode = jwt_decode(response.data.token);
          localStorage.setItem("expiresAt", decode.exp);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, firstName, lastName, country, mobile) {
    return axios.post("signup", {
      email,
      firstName,
      lastName,
      country,
      mobile,
    });
  }

  renew(token = "") {
    return axios
      .post("users/current")
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          const decode = jwt_decode(response.data.token);
          localStorage.setItem("expiresAt", decode.exp);
        }
      })
      .catch((error) => {
     //   console.log(error);
        this.logout();
      });
  }

  getCurrentUser(token = "", expiresAt = "") {
    this.renew(token)
      .then((response) => {
  //      console.log(response);
      })
      .catch((error) => {
   //     console.log(error);
      });
    const userStr = localStorage.getItem("user");
    if (!expiresAt) expiresAt = localStorage.getItem("expiresAt");
    if (!token) token = localStorage.getItem("token");

    // if the user doesn't exist, return null
    if (!userStr || !token) {
      return null;
    }

    const user = JSON.parse(userStr);
    const now = Date.now() / 1000;
    // compare the expiry time of the user with the current time
    if (now > expiresAt) {
      // If the user is expired, delete the user from storage
      // and return null
      return null;
    }

    return user;
  }

  getServer() {
    return localStorage.getItem("server");
  }
}

export default new AuthService();
