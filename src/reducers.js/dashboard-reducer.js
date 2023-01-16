import { fromJS } from "immutable";
import { createReducerFromObject } from "../utils/miscellaneous/reducer-util";
import { STORE_SELLER_PRODUCTS } from "../views/ondc-dashboard/state/constants";

const initialState = fromJS({
    sellerOndcProducts: null
});

const reducerFunction = {
    [STORE_SELLER_PRODUCTS]: (state, payload) => {
        let newState = state.set('sellerOndcProducts', fromJS(payload));
        return newState;
    },
};


const dashboardReducer = createReducerFromObject(
    reducerFunction,
    initialState
);
export default dashboardReducer;
