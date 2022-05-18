import axios from "axios";
export default function authHeader(token) {
  // const user = AuthService.getCurrentUser();
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}
