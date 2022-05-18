import { SET_TOKEN_DATA, SAVE_USER_DATA } from "../actions";

export const setTokenData = (data) => {
  return {
    type: SET_TOKEN_DATA,
    payload: data,
  };
};

export const saveUserData = (data) => {
  return {
    type: SAVE_USER_DATA,
    payload: data,
  };
};
