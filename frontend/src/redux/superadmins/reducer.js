import { SET_SUPERADMINS, DELETE_SUPERADMINS } from "../actions";

const initValue = {
    superadmins: [],
};

export default (state = initValue, action) => {
    switch (action.type) {
        case SET_SUPERADMINS:
            return { ...state, superadmins: action.payload };
        case DELETE_SUPERADMINS:
            return {
                superadmins: [
                    ...state.superadmins.filter(superadmin => superadmin.id !== action.payload._id)
                ]
            }
        default:
            return { ...state };
    }
};
