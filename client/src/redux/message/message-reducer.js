import {
    GET_MESSAGES,
    GET_MESSAGE
} from './message-types';

const initialState = {
    messages: [],
    message: [],
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            };
        case GET_MESSAGE:
            return {
                ...state,
                message: payload,
                loading: false
            };
        default:
            return state;
    }
}