import { SET_OFFERS, SET_JOB } from "../actions";
import isEmpty from "../../utils/is-empty";

const INIT_STATE = {
  offers: [],
  job: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    default:
      return { ...state };
  }
};
