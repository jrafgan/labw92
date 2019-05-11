import {
    CREATE_PRODUCT_FAILURE, FETCH_PRODUCTS_SUCCESS,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/chatActions";

const initialState = {
    categories: null,
    chat: null,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories};

        case CREATE_PRODUCT_FAILURE:
            return {...state, error: action.error};

        case FETCH_PRODUCTS_SUCCESS:
            return {...state, chat: action.chat};

        default:
            return state;
    }
};

export default chatReducer;