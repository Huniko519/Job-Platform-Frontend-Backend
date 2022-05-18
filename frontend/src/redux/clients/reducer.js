import { SET_CLIENTS, DELETE_CLIENTS } from '../actions';

const initialState = {
    clients: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENTS:
            return { ...state, clients: action.payload };
        case DELETE_CLIENTS:
            return {
                clients: [
                    ...state.clients.filter((client) => client.id !== action.payload._id)
                ]
            };
        default:
            return { ...state };
    }
};