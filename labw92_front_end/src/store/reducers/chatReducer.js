import {
    CREATE_PRODUCT_FAILURE, FETCH_PRODUCTS_SUCCESS,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/chatActions";

const initialState = {
    messages: [],
    onlineUsers: null,
    leftUser: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_MESSAGE":
            return {...state, messages: [
                    ...action.decodedMessage.message
                ]
            };

        case "ACTIVE_USERS":
            return {...state, onlineUsers: action.decodedMessage.usernames};

        case "LATEST_MESSAGES":
            return {...state, messages: [
                    ...action.decodedMessage.messages
                ]};

        case "USER_LEFT":
            return {...state, leftUser: action.decodedMessage.username};

        default:
            return state;
    }
};

export default chatReducer;