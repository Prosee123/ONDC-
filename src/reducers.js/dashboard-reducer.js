import { fromJS } from "immutable";
import { createReducerFromObject } from "../utils/miscellaneous/reducer-util";
import { STORE_SELLER_PRODUCTS, STORE_REGISTERED_USER_INFO } from "../views/ondc-dashboard/state/constants";

const initialState = fromJS({
    sellerOndcProducts: null,
    storeRegisteredUserInfo: null,
});

const reducerFunction = {
    [STORE_SELLER_PRODUCTS]: (state, payload) => {
        let newState = state.set('sellerOndcProducts', fromJS(payload));
        return newState;
    },
    [STORE_REGISTERED_USER_INFO]: (state, payload) => {
        let newState = state.set('storeRegisteredUserInfo', fromJS(payload));
        localStorage.setItem('login_access_token',payload.tokens.access.token)
        return newState;
    },
};


const dashboardReducer = createReducerFromObject(
    reducerFunction,
    initialState
);
export default dashboardReducer;
