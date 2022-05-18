import {
  SET_CONTRACTORS,
  DELETE_CONTRACTORS,
  UPDATE_CONTRACTORS,
} from "../actions";

const initValue = {
  contractors: [],
};

export default (state = initValue, action) => {
  switch (action.type) {
    case SET_CONTRACTORS:
      return { ...state, contractors: action.payload };
    case UPDATE_CONTRACTORS:
      return {
        contractors: [
          ...state.contractors.map((contractor) => {
            if (contractor.id == action.payload.id) {
              return { ...contractor, status: action.payload.status };
            }
            return contractor;
          }),
        ],
      };

    case DELETE_CONTRACTORS:
      return {
        contractors: [
          ...state.contractors.filter(
            (contractor) => contractor.id !== action.payload._id
          ),
        ],
      };
    default:
      return { ...state };
  }
};
