import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';


export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchProductsSuccess = messages => ({type: FETCH_PRODUCTS_SUCCESS, messages});
export const createProductFailure = error => ({type: CREATE_PRODUCT_FAILURE, error});

export const getCategories = () => {
    return dispatch => {
        return axios.get('/categories').then(
            response => {
                dispatch(fetchCategoriesSuccess(response.data));
            });
    };
};

export const getProducts = () => {
    return dispatch => {
        return axios.get('/products').then(
            response => {
                dispatch(fetchProductsSuccess(response.data));
                console.log(response.data);
            });
    };
};

export const getProductsByCategory = (categoryId) => {
    return dispatch => {
        return axios.get('/chat?category=' + categoryId).then(
            response => {
                dispatch(fetchProductsSuccess(response.data));
                console.log(response.data);

            });
    };
};

export const getProductById = (id) => {

    return dispatch => {
        return axios.get('/chat/' + id).then(
            response => {
                dispatch(fetchProductsSuccess(response.data));
                console.log('this is ', response.data);

            });
    };
};

export const createProduct = productData => {
    console.log(productData);
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/chat/', productData, config).then(
            response => {
                console.log(response.data);
                dispatch(push('/'));

            },
            error => {
                if (error.response) {
                    dispatch(createProductFailure(error.response.data));
                    console.log(error.response.data);
                } else {
                    dispatch(createProductFailure({global: "No network connection "}))
                }
            });
    };
};

