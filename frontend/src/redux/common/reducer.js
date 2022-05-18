import {
  LOGOUT_USER,
  SET_TOKEN_DATA,
  SET_USER_DATA,
  SAVE_USER_DATA,
} from "../actions";
import isEmpty from "../../utils/is-empty";

const INIT_STATE = {
  isAuthenticated: isEmpty(localStorage.getItem("user")) ? false : true,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  token: localStorage.getItem("token") || "",
  expiresAt: localStorage.getItem("expiresAt") || "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN_DATA:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
      };
    case SET_USER_DATA:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
      return {
        ...state,
        token: "",
        user: {},
        expiresAt: "",
        isAuthenticated: false,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};
