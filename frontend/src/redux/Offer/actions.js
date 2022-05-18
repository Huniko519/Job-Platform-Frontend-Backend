import { SET_OFFERS } from "../actions";

export const setTokenData = (data) => {
  return {
    type: SET_OFFERS,
    payload: data,
  };
};
